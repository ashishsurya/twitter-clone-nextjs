import React from 'react';
import Post from './Post';
import PostInput from './PostInput';

// eslint-disable-next-line react/display-name
export const Feed = React.memo(({ titleRef, tweets }) => {
  return (
    <div className='min-w-fit'>
      <div className='border-b-[0.2px] sticky top-0 z-50 border-zinc-700 p-3  bg-black'>
        <h1 className='text-2xl font-bold '>Home</h1>
      </div>
      <PostInput titleRef={titleRef} />
      <div>
        {/* posts */}

        {tweets.map((t) => (
          <Post
            key={t.id}
            profileName={t.author.name}
            userName={t.author.username}
            userImg={t.author.imageUrl}
            title={t.title}
            img={t.picUrl}
            createdAt={t.createdAt}
          />
        ))}
      </div>
    </div>
  );
});

export default Feed;
