import { ReactNode, forwardRef, InputHTMLAttributes } from 'react';

interface MergedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  header: string;
  icon?: ReactNode | string;
  rightElement?: ReactNode;
  iconPosition?: 'left' | 'right';

}

const MergedInputDate = forwardRef<HTMLInputElement, MergedInputProps>(
  (
    {
      header,
      icon,
      iconPosition = 'right',
      rightElement,
      type = 'date', 
      ...rest
    },
    ref
  ) => {
    return (
      <div className='relative w-full mt-6'>
        <div className='relative'>
          <input
            {...rest}
            ref={ref}
            type={type}
            id={header?.replace(/\s+/g, '').toLowerCase()}
            placeholder={rest.placeholder}
            className={`peer w-full border border-black rounded-md px-3 pt-2 pb-2 outline-none placeholder:text-[12px] ${
              icon && iconPosition === 'left' ? 'pl-10' : ''
            } ${icon && iconPosition === 'right' ? 'pr-10' : ''}`}
          />

          {icon && (
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 ${
                iconPosition === 'left' ? 'left-3' : 'right-3'
              }`}
            >
              {icon}
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

       
        </div>
      </div>
    );
  }
);

export default MergedInputDate;
