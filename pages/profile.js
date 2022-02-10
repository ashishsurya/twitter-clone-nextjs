import Head from 'next/head';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';

export default function ProfilePage({ trending }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = async () => {
      await fetch('http://localhost:3000/api/user')
        .then((res) => res.json())
        .then((v) => setUser(v.data));
    };

    unsubscribe();
  }, []);

  return (
    <div className='max-w-7xl  min-h-screen mx-auto flex'>
      <Head>
        <title>Profile / Twitter</title>
      </Head>
      <Sidebar canTweet={false} />
      <main className='flex-grow border-x-[0.2px] ml-[60px] sm:ml-[70px] md:ml-[100px] lg:ml-[300px] max-w-2xl border-zinc-700 '>
        <UserProfile user={user} />
      </main>
      {/* <Trending trending={trending} /> */}
    </div>
  );
}

export async function getStaticProps() {
  const trending = await fetch('https://jsonkeeper.com/b/L9MH').then((res) =>
    res.json()
  );
  // const res = await fetch('http://localhost:3000/api/user').then((res) => res.json());
  return {
    props: {
      // user: res.data,
      trending: trending.data,
    },
  };
}
