// components/ResidentCard.tsx

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface ResidentCardProps {
  name: string;
  hostel: string;
  floor: string;
  room: string;
  parentName: string;
  imageSrc: string;

  time: string;
}

const ResidentCard: React.FC<ResidentCardProps> = ({
  name,
  hostel,
  floor,
  room,
  parentName,
  imageSrc,
  
  time,
}) => {
  return (
    <div className='w-full mx-auto font-in'>
      <Card className='bg-primary relative p-[10px] gap-[4px] w-[298px] h-[180px] [border-radius:10px_10px_0px_10px]'>
        <Button className='absolute top-[10px] right-[10px] flex justify-center items-center px-4 py-2 gap-2 w-[54px] h-[19px] bg-[#2D6263] rounded-[4px] font-medium text-white text-[11px] font-inter'>
          Edit
        </Button>

        <div className='flex flex-row items-center w-[278px] h-[19px]'>
          <div className='flex items-center gap-1'>
            <CardTitle className='text-[13px] text-white font-bold'>
              {name}
            </CardTitle>
            <span className='text-[#FFFFFF] font-bold text-[12px] leading-[15px] font-inter'>
              (Resident)
            </span>
          </div>
        </div>

        <CardContent className='flex flex-row items-start p-[10px] gap-2 w-[278px] h-[120px] bg-secondary rounded-[4px]'>
          <div className='w-[66px] h-[92px] overflow-hidden rounded-md flex-shrink-0'>
            <img
              src={imageSrc}
              alt='Resident'
              className='w-full h-full object-cover rounded-md'
            />
          </div>

          <div className='grid grid-cols-[auto_10px_1fr] gap-x-1 gap-y-[6px] text-[12px] leading-[15px] text-[#FFFFFF] font-inter whitespace-nowrap overflow-hidden text-ellipsis'>
            <span className='font-medium'>Resident Name</span>
            <span>:</span>
            <span className='font-normal'>{name}</span>

            <span className='font-medium'>Hostel</span>
            <span>:</span>
            <span className='font-normal'>{hostel}</span>

            <span className='font-medium'>Floor no</span>
            <span>:</span>
            <span className='font-normal'>{floor}</span>

            <span className='font-medium'>Room no</span>
            <span>:</span>
            <span
              className={`font-normal ${
                !room || room.trim() === ''
                  ? 'text-[#FF0505]'
                  : 'text-[#FFFFFF]'
              }`}
            >
              {room || 'Invalid Room'}
            </span>

            <span className='font-medium'>Parents name</span>
            <span>:</span>
            <span
              className={`font-normal ${
                !parentName || parentName.trim() === ''
                  ? 'text-[#FF0505]'
                  : 'text-[#FFFFFF]'
              }`}
            >
              {parentName || 'Invalid Name'}
            </span>
          </div>
        </CardContent>

        <div className='flex flex-row justify-end items-center gap-[10px] w-full mt-auto h-[16px]'>
          <p className='font-inter font-normal text-[12px] leading-[15px] text-[#FFFFFF] flex items-center'>
            {time}
          </p>
          <div className='w-[16px] h-[16px] rounded-full border-[3px] border-[#B1B1B1] bg-transparent'></div>
        </div>
      </Card>
    </div>
  );
};

export default ResidentCard;
