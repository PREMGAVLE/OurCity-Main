import {  MapPin, Search } from 'lucide-react';
import { ReactNode, forwardRef, InputHTMLAttributes } from 'react';

interface MergedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  header: string;
  icon?:any; 
  rightElement?: ReactNode;
  iconPosition?: 'left' | 'right';
  showGenderRadio?: boolean;
  onGenderChange?: (gender: 'boys' | 'girls') => void;
}

const MergedInput = forwardRef<HTMLInputElement, MergedInputProps>(
  (
    {
      header,
      icon,
      iconPosition = 'right',
      showGenderRadio = false,
      onGenderChange,
      rightElement,
      ...rest
      
    },
    ref
  ) => {


    return (
      <div className='relative w-full mt-4'>
        <div className='relative'>
          <input
            {...rest}
            ref={ref}
            type='text'
            id={header?.replace(/\s+/g, '').toLowerCase()}
            placeholder={rest.placeholder}
            className={`peer w-full border border-black rounded-md px-3 pt-1 pb-2 outline-none  placeholder:text-[12px]  ${
              icon && iconPosition === 'left' ? 'pl-10' : ''
            } ${icon && iconPosition === 'right' ? 'pr-10' : ''}`}
          />

          {icon && (
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 ${
                iconPosition === 'left' ? 'left-3' : 'right-3'
              }`}
            >
              {icon?.props?.children==="Location"?<MapPin className='text-primary'/>:icon?.props?.children==="Search"? <Search className='text-primary'/>:icon}
            </div>
          )}

          {rightElement && (
            <div className='ml-2 flex items-center gap-2'>{rightElement}</div>
          )}

          <label
            htmlFor={header?.replace(/\s+/g, '').toLowerCase()}
            className='absolute left-3 top-0 bg-white px-1 text-gray-500 text-xs transform -translate-y-1/2'
          >
            {header}
          </label>

          {showGenderRadio && (
            <div className='flex gap-4 mt-2'>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name={`${header}-gender`}
                  value='boys'
                  onChange={() => onGenderChange?.('boys')}
                  className='h-4 w-4 text-blue-600'
                />
                <span className='ml-2 text-gray-700'>Boys</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  name={`${header}-gender`}
                  value='girls'
                  onChange={() => onGenderChange?.('girls')}
                  className='h-4 w-4 text-pink-600'
                />
                <span className='ml-2 text-gray-700'>Girls</span>
              </label>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default MergedInput;