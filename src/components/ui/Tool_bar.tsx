

const Tool_bar = (setChatRole?:any) => {
  console.log(setChatRole)

  return (
    <div className='flex flex-row items-center p-1 gap-1 w-[353px] h-[42px] bg-primary rounded-lg'>
      <div className='flex-1 text-[#FFFFFF] py-2 rounded-lg text-center  font-inter font-normal text-sm leading-4'>
        All
      </div>
      <div  className='flex flex-row justify-center items-center px-1 py-[2px] gap-[10px] w-[97px] h-[34px] bg-white rounded-md text-primary text-[14px] leading-[17px] font-normal text-center font-inter'>
        Check In-Out
      </div>
      <div className='flex-1 text-[#FFFFFF] py-2 text-center  font-inter font-normal text-sm leading-4'>
        Missed
      </div>
      <div  className='flex-1 text-[#FFFFFF]  py-2 text-center font-inter font-normal text-sm leading-4'>
        Summary
      </div>
    </div>
  );
};

export default Tool_bar;
