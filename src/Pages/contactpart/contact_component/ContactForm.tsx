import React, { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utills/variants';
 

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ContactForm: React.FC<Props> = ({ handleSubmit }) => (
  <motion.form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500 space-y-4"
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={2}
  >
    <h2 className="text-2xl font-semibold text-blue-700 mb-2">Send a Message</h2>

    <motion.div variants={fadeIn} custom={3}>
      <label className="block text-gray-700 mb-1" htmlFor="name">Your Name</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </motion.div>

    <motion.div variants={fadeIn} custom={4}>
      <label className="block text-gray-700 mb-1" htmlFor="email">Your Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </motion.div>

    <motion.div variants={fadeIn} custom={5}>
      <label className="block text-gray-700 mb-1" htmlFor="message">Your Message</label>
      <textarea
        id="message"
        name="message"
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />
    </motion.div>

    <motion.button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      variants={fadeIn}
      custom={6}
    >
      Submit
    </motion.button>
  </motion.form>
);

export default ContactForm;