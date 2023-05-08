import { FC } from 'react';

import AddFriendButton from '@/components/AddFriendButton';

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <main className="pt-8">
      <h1 className="mb-8 text-5xl font-bold">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default page;
