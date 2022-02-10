/* eslint-disable @next/next/no-img-element */
import {
  ChatAltIcon,
  SwitchHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import moment from 'moment';

export default function Post({ userImg, profileName, userName, img, title, createdAt }) {
  const d = new Date(createdAt);
  return (
    <div className='p-4 cursor-pointer border-b border-zinc-700 hover:bg-gray-600 hover:bg-opacity-30'>
      <div className='flex items-start justify-stretch space-x-3'>
        {/*header*/}
        <img
          src={userImg}
          alt=''
          className='rounded-full w-7 h-7 sm:h-10 sm:w-10'
        />
        <div className='flex flex-col  space-y-2 text-sm flex-1'>
          <div className='flex space-x-2 items-center'>
            {/* profile name */}
            <p className='font-semibold hover:underline'>{profileName}</p>
            <span className='font-bold'>&middot;</span>
            {/* username */}
            <p className='text-xs sm:text-sm font-light hover:underline'>
              @{userName}
            </p>
            <span className='font-bold'>&middot;</span>

            {/* time */}
            <p className='text-xs sm:text-sm text-gray-700'>{createdAt}</p>
          </div>
          <p className='text-sm text-justify whitespace-pre-line'>
            {title}
          </p>
          {img && (
            <img
              alt=''
              src={img}
              className='flex-1 rounded-3xl w-full h-full'
            />
          )}

          <div className='flex items-center justify-between mt-1'>
            <PostFooterInfo Icon={ChatAltIcon} color='sky' count={3} />
            <PostFooterInfo
              Icon={SwitchHorizontalIcon}
              color='green'
              count={1}
            />
            <PostFooterInfo Icon={HeartIcon} color='red' count={99} />
            <PostFooterInfo Icon={ChatAltIcon} count={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

const PostFooterInfo = ({ Icon, title, count, color }) => {
  const theme = `text-${color}-600`;
  return (
    <div className='text-gray-700 text-sm  flex items-center space-x-2 bg-transparent  hover:bg-slate-100 rounded-3xl hover:bg-opacity-10 p-2 hover:text-sky-400'>
      <Icon className={`w-5 h-5`} />
      <p className='text-white'>{count}</p>
    </div>
  );
};
