interface UploadButtonProps {
  label?: string;
   onClick?: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClick }) => {
  return (
    <div className='flex flex-col items-start my-3' onClick={onClick}>
      {/* <span className='mb-1 text-sm font-medium text-gray-700'>{label}</span> */}
      <div className='flex flex-row items-center p-1 gap-1 w-[106px] h-[40px] border border-[#B1B1B1] rounded-full cursor-pointer hover:bg-gray-100'>
        <div className='w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full text-black'>
          +
        </div>
        <span className='font-medium text-gray-700'>Add</span>{' '}
      </div>
    </div>
  );
};

export default UploadButton;
