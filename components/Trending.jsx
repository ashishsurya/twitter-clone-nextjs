import SearchBar from './SearchBar';

export default function Trending({ trending }) {
  return (
    <div className=' hidden md:inline-flex flex-grow flex-col  lg:pl-5 pt-2 space-y-5 max-w-xs'>
      {/* Search Bar */}

      <SearchBar />

      {/* What's Happening */}
      <div className='bg-[#16181C] rounded-3xl'>
        <h1 className='text-white font-bold text-lg p-3'>
          What&apos;s Happening??
        </h1>
        <div className='space-y-3 mt-5'>
          {trending?.map((item) => (
            <TrendingComponent key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const TrendingComponent = ({ title, description, subDescription }) => {
  return (
    <div className='hover:bg-slate-400  lg:p-3 cursor-pointer  hover:bg-opacity-10 space-y-2'>
      <h1 className='text-sm text-gray-600'>{title}</h1>
      <p className='text-justify font-bold'>{description}</p>
      <p className='text-xs text-gray-600'>{subDescription}</p>
    </div>
  );
};
