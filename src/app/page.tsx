import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default async function Home() {
  return <div className="text-red-800">hello world</div>;
}
