interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
  }
  
  const Button = ({ text, onClick, className }: ButtonProps) => {
    return (
      <button
        className={`w-full py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default Button;