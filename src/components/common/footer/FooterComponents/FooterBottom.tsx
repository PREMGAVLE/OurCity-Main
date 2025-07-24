const FooterBottom = () => (
  <div className="flex flex-col items-center mt-8 text-pink-600 font-semibold space-y-2 ">
    <p className="text-lg text-center">© 2025 Burhanpur AkryptTech. All rights reserved.</p>
    <div className="flex space-x-6 text-gray-400 pb-4">
      {["💳 Visa", "💳 MasterCard", "💳 Amex", "📲 UPI"].map(item => (
        <span key={item} className="hover:text-pink-500 cursor-pointer">{item}</span>
      ))}
    </div>
  </div>
);

export default FooterBottom;
