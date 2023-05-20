import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { addFriendValidator } from '@/lib/validations/add-friend';
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const idToAdd = (await fetchRedis(
      'get',
      `user:email:${emailToAdd}`
    )) as string;

    if (!idToAdd) new Response("This person doesn't exits", { status: 400 });
    const session = await getServerSession(authOptions);
    if (!session) new Response('Unauthorized', { status: 401 });
    if (idToAdd === session?.user.id)
      new Response('You cannot add yourself', { status: 400 });
    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session?.user.id!
    )) as 0 | 1;
    if (isAlreadyAdded)
      new Response('Already added this user', { status: 400 });

    const isAlreadyFriends = (await fetchRedis(
      'sismember',
      `user:${session?.user.id}:friends`,
      idToAdd
    )) as 0 | 1;
    if (isAlreadyFriends) new Response('Already friends', { status: 400 });

    // notify the user
    pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      'incoming_friend_requests',
      {
        senderId: session?.user.id!,
        senderEmail: session?.user.email!,
      }
    );
    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session?.user.id!);

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 });
    }
    return new Response('Invalid request', { status: 400 });
  }
}
