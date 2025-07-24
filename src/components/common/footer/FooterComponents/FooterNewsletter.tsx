import { motion } from "framer-motion";

const FooterNewsletter = () => (
  <div className="  ">
    <h3 className="font-bold text-xl mb-3">Newsletter</h3>
    <p className="text-md font-normal mb-4">Stay updated with the latest travel deals and tips!</p>
    <div className="flex">
      <input
        type="email"
        placeholder="Your E-mail"
        className="p-2 border border-gray-600 rounded-l bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <motion.button
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.5 }}
        className="bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-r cursor-pointer"
      >
        ➤
      </motion.button>
    </div>
  </div>
);

export default FooterNewsletter;
