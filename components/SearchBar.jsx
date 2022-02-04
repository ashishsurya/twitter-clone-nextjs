import { SearchIcon } from '@heroicons/react/outline';
const SearchBar = () => {
  return (
    <div className='text-[#6E767C] flex justify-center space-x-3 bg-[#16181C] items-start rounded-full p-3'>
      <SearchIcon className='w-6' />
      <input type="text" placeholder='Search Twitter' className='bg-transparent focus:outline-none flex-1'/>
    </div>
  );
};

export default SearchBar;
