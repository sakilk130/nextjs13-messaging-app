import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function chatHrefConstructor(id1: string, id2: string): string {
  const sortedIds = [id1, id2].sort();
  return `/chat/${sortedIds[0]}--${sortedIds[1]}`;
}

export const toPusherKey = (key: string) => key.replace(/:/g, '__');
