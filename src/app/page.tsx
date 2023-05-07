import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
});

export default function Home() {
  return <div className="text-red-800">hello world</div>;
}
