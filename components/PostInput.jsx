import { useRef, useState } from 'react';
import { PhotographIcon } from '@heroicons/react/solid';
import Profile from './Profile';
import useUser from '../lib/useUser';
import { useRouter } from 'next/router';

/* eslint-disable @next/next/no-img-element */
export default function PostInput({ titleRef }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [btnloading, setbtnloading] = useState(false);
  const inputRef = useRef(null);
  const user = useUser()
  const router = useRouter()


  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleTweetSubmit = async (e) => {
    e.preventDefault();

    setbtnloading(true);

    const post = {
      title,
      img: selectedFile,
      author:user
    };
    console.log(post);

    // make an api call.... to /api/newpost

    const res = await fetch('/api/newpost', {
      method: 'POST',
      body: JSON.stringify(post),
    })
    
    // checking status of the request.
    if (res.status === 201) {
      console.log("Post successfully created.");
      res.json().then(d => console.log(d))
    } else {
      console.log("Something went wrong.");
    }

    setTitle('');
    setSelectedFile(null);
    setbtnloading(false)

    router.push("/")



  };

  return (
    <div className='p-3 border-b border-zinc-700'>
      <div className='flex space-x-3'>
        <Profile />
        <form
          onSubmit={handleTweetSubmit}
          className='flex-1 flex items-center justify-center space-x-2'
        >
          <textarea
            type='text'
            value={title}
            ref={titleRef}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className='bg-transparent focus:outline-none focus:border-b flex-1 py-4'
            placeholder="What's Happening?"
          />
          <input
            type='file'
            className='hidden'
            ref={inputRef}
            onChange={addImage}
          />
          <button
            onClick={() => {
              inputRef.current.click();
            }}
            title='Add Image'
            type='button'
            className=' hover:bg-gray-200 hover:bg-opacity-10 text-sky-600 rounded-full'
          >
            <PhotographIcon className='w-10 h-10 p-2' />
          </button>
          <button
            type='submit'
            disabled={!title.length > 0 || title.trim() === ''}
            className='py-3 px-4 font-bold bg-gradient-to-r   rounded-full text-xs bg-sky-600 hover:bg-sky-500 mx-auto disabled:cursor-not-allowed disabled:bg-gray-700'
          >
            {btnloading ? "..." : "Tweet"}
          </button>
        </form>
      </div>
      {selectedFile && (
        <div className='p-2 mt-4 relative'>
          <p className='absolute text-4xl top-1/2 left-1/2 -translate-x-1/2'>
            PREVIEW
          </p>
          <span
            onClick={() => {
              setSelectedFile(null);
            }}
            className='text-xl  absolute top-[20px] left-[30px] z-20 cursor-pointer'
          >
            &times;
          </span>
          <img src={selectedFile} alt='' className='rounded-3xl  opacity-70' />
        </div>
      )}
    </div>
  );
}

//
