import Head from 'next/head';
import { useRef } from 'react';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Trending from '../components/Trending';
import { prisma } from '../prisma-client/prisma';

export default function Home({ tweets, trending }) {
  const titleRef = useRef(null);
  return (
    <div className='max-w-7xl  min-h-screen mx-auto flex '>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <Sidebar titleRef={titleRef} canTweet={true} />
      <main className='flex-grow border-x-[0.2px] ml-[60px] sm:ml-[70px] md:ml-[100px] lg:ml-[250px] max-w-2xl border-zinc-700 '>
        <Feed titleRef={titleRef} tweets={tweets} />
      </main>
      <Trending trending={trending} />
    </div>
  );
}

export async function getServerSideProps() {
  const tweets = await prisma.post.findMany({ include: { author: true } ,orderBy:{createdAt:'desc'}});
  const trending = await fetch('https://jsonkeeper.com/b/L9MH').then((res) =>
    res.json()
  );

  //   newsLetters.map(x => {
  //     x.createdAt = Math.floor(x.createdAt / 1000);
  //     return x;
  // })

  tweets.map((tweet) => {
    const d = new Date(tweet.createdAt)
    tweet.createdAt = `${d.toDateString()}`
    return tweet;
  });
  return {
    props: {
      tweets,
      trending: trending.data,
    },
  };
}
