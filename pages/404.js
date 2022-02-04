import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='flex items-center justify-center flex-col min-h-screen space-y-4'>
      <Head>
        <title>404.js / Twitter</title>
      </Head>
      <h1 className='font-bold tracking-tighter text-3xl text-center text-sky-500'>
        This app is built for educational purpose, and doesn&apos;t contain all
        features of Twitter
      </h1>
      <p className='underline text-lg font-extrabold'>
        <Link href={'/'}>Go To Home</Link>
      </p>
    </div>
  );
}
