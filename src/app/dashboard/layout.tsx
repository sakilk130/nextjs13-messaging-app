import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { Icon, Icons } from '@/components/Icons';
import { authOptions } from '@/lib/auth';

interface LayoutProps {
  children: ReactNode;
}
interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Add Friend',
    href: '/dashboard/add',
    Icon: 'UserPlus',
  },
];
const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className="flex w-full h-screen">
      <div className="flex-col hidden w-full h-full max-w-xs px-6 overflow-y-auto bg-white border-r border-gray-200 md:flex grow gap-y-5">
        <Link href="/dashboard" className="flex items-center h-16 shrink-0">
          <Icons.Logo className="w-auto h-8 text-indigo-600" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>Chats</li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>
              <ul role="list" className="mt-2 -mx-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="flex gap-3 p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-indigo-600 hover:bg-gray-50 group"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="w-4 h-4" />
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
