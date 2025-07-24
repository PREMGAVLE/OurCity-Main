 
import { motion } from 'framer-motion';
import { fadeIn } from '@/utills/variants';;

const ContactInfo = () => (
  <motion.div
    className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-500"
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={1}
  >
    <h2 className="text-2xl font-semibold text-green-700 mb-4">Official Contact Info</h2>
    <div className="text-gray-700 space-y-2">
      <p><strong>📍 Address:</strong> Akrypt IT Solution, Amravati Road, Burhanpur - 450331</p>
      <p><strong>📞 Phone:</strong> <a href="tel:+9770362271" className="text-blue-600">97703-62271</a></p>
      <p><strong>✉️ Email:</strong> <a href="mailto:dmburhanpur@nic.in" className="text-blue-600">dmburhanpur@nic.in</a></p>
      <p><strong>🌐 Website:</strong> <a href="https://burhanpur.nic.in" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">burhanpur.nic.in</a></p>
    </div>
  </motion.div>
);

export default ContactInfo;