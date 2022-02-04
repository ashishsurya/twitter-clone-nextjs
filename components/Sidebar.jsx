import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getActiveSection } from '../utils/getActiveSection';

export default function Sidebar({ titleRef,canTweet }) {
  return (
    <div className=' lg:pr-2 fixed'>
      <div className='flex flex-col items-center md:items-start md:ml-4 space-y-3'>
        <Link href='/' passHref>
          <div className='hover-animation w-16 h-16 flex items-center justify-center'>
            <Image
              src='https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/twitter-icon-18-256.png'
              alt=''
              width={30}
              height={30}
            />
          </div>
        </Link>
        <SidebarHelper Icon={HomeIcon} title={'Home'} />
        <SidebarHelper Icon={HashtagIcon} title={'Explore'} />

        <SidebarHelper Icon={BellIcon} title={'Notifications'} />
        <SidebarHelper Icon={MailIcon} title={'Messages'} />
        <SidebarHelper Icon={BookmarkIcon} title={'Bookmarks'} />
        <SidebarHelper Icon={ClipboardListIcon} title={'Lists'} />
        <SidebarHelper Icon={UserIcon} title={'Profile'} />
        <SidebarHelper Icon={DotsCircleHorizontalIcon} title={'More'} />
        {canTweet && <button
          onClick={() => {
            titleRef.current.focus();
          }}
          className='py-3 px-4 font-bold bg-gradient-to-r  lg:w-full  rounded-full text-lg bg-sky-600 hover:bg-sky-500 mx-auto'
        >
          <PlusIcon className='lg:hidden w-5 h-5' />
          <span className='hidden lg:block tracking-wide'>Tweet</span>
        </button>}
      </div>
    </div>
  );
}

const SidebarHelper = ({ Icon, title }) => {
  const { pathname } = useRouter();
  const section = getActiveSection(pathname);
  const active = title.toLowerCase() === section;
  return (
    <Link
      href={title.toLowerCase() === 'home' ? '/' : title.toLowerCase()}
      passHref
    >
      <div
        className={` flex items-center  w-max hover-animation ${
          active ? 'bg-slate-300 bg-opacity-10 font-bold' : 'font-extralight'
        }`}
      >
        <Icon className='w-5 h-5 sm:w-7 sm:h-7' />
        <h1 className='ml-4 text-xl hidden lg:inline-flex'>{title}</h1>
      </div>
    </Link>
  );
};
