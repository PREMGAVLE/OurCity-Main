import { ReactNode, forwardRef, SelectHTMLAttributes } from 'react';

interface MergedSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  header: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  rightElement?: ReactNode;
}

const MergedSelect = forwardRef<HTMLSelectElement, MergedSelectProps>(
  ({ header, icon, iconPosition = 'right', rightElement, children, ...rest }, ref) => {
    return (
      <div className="relative w-full mt-6">
        <div className="relative">
        <style>{`
          select option:checked {
            background-color: #87A5A6;
            color: white;
          }
        `}</style>
          <select
            {...rest}
            ref={ref}
            id={header.replace(/\s+/g, '').toLowerCase()}
            className={`peer w-full border border-gray-300 rounded-md px-3 pt-1 pb-2 bg-white outline-none appearance-none ${
              icon && iconPosition === 'left' ? 'pl-10' : ''
            } ${icon && iconPosition === 'right' ? 'pr-10' : ''}`}
          >
            {children}
          </select>

          {icon && (
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none ${
                iconPosition === 'left' ? 'left-3' : 'right-3'
              }`}
            >
              {icon}
            </div>
          )}

          {rightElement && (
            <div className="ml-2 flex items-center gap-2">{rightElement}</div>
          )}

          <label
            htmlFor={header?.replace(/\s+/g, '').toLowerCase()}
            className="absolute left-3 top-0 bg-white px-1 text-gray-500 text-xs transform -translate-y-1/2"
          >
            {header}
          </label>
        </div>
      </div>
    );
  }
);

export default MergedSelect;
