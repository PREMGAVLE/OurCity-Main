import React, { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utills/variants';
import ContactInfo from './contact_component/ContactInfo';
import ContactForm from './contact_component/ContactForm';
 
const ContactUs: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Message submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16">
      <motion.div
        className="text-center mb-12"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        <h1 className="text-4xl font-bold text-blue-700">Contact Us</h1>
        <p className="text-gray-600 mt-3">
          We'd love to hear from you — reach out to us with questions, feedback, or suggestions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <ContactInfo />
        <ContactForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ContactUs;
