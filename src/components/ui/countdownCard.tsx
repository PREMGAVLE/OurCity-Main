// CountdownCard.tsx

import React from 'react';

// Define types for the props that CountdownCard will receive
interface CountdownCardProps {
  title: string;
  count: number;
  color: string;
}

const CountdownCard: React.FC<CountdownCardProps> = ({
  title,
  count,
  color,
}) => {
  return (
    <div className='relative w-[81px] h-[49px] bg-[#87A5A6] rounded-md flex items-center justify-center text-[#FFFFFF]'>
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${color}`} />
      <div className='p-0 text-center flex flex-col items-center justify-center gap-[4px]'>
        <p className='font-inter text-[16px] font-bold leading-[19px]'>
          {count}
        </p>
        <p className='font-inter text-[10px] leading-[12px] font-normal text-[#FFFFFF] z-[1] whitespace-nowrap'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default CountdownCard;
