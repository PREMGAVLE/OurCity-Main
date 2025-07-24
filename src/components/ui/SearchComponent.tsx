import { Input } from '@/components/ui/input';

// Define the props interface
interface SearchComponent {
 
  setSearchQuery:any;
  searchQuery:string
  placeholder:string
}
const SearchComponent: React.FC<SearchComponent> = ({
  setSearchQuery,
  searchQuery,
  placeholder = 'Search',
}) => {
  return (
    <div className='max-w-[380px] mx-auto'>
      <div className='relative mb-4'>
        <Input
          type='text'
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e)=>{setSearchQuery(e.target.value)}}
          className='pr-10 bg-white text-[#555E68] font-inter font-normal text-[16px] leading-[19px] border border-[#CDD7E1] rounded-[10px] shadow-sm'
        />
        <img
          src='/assets/searchicon.svg'
          alt='Search'
          className='absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5'
        />
      </div>
    </div>
  );
};

export default SearchComponent;
