import  { useEffect, useState } from 'react';
import { Atom } from 'react-loading-indicators';
import { motion } from 'framer-motion';

const AsirgarhFort = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

   return (
    <div className="min-h-screen">
      {loading ? (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <Atom color="#fa0606" size="medium" text="" textColor="#f40c0c" />
        </div>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto px-4 py-10 space-y-12 font-sans"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          custom={0}
        >
          {/* Title */}
          <motion.div
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h1 className="text-4xl font-bold text-gray-800">🏰 Asirgarh Fort, Burhanpur</h1>
            <p className="text-lg text-gray-500 mt-2">The Gateway to the Deccan</p>
          </motion.div>

          {/* Overview */}
          <motion.section
            className="space-y-5 text-gray-700 leading-relaxed text-lg"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <h2 className="text-2xl font-semibold text-gray-800">📝 Overview</h2>
            <p>
              Asirgarh Fort is a massive historical fort situated in the Satpura Range near Burhanpur. Often referred to as the "key to the Deccan", it has immense strategic importance due to its location between North and South India.
            </p>
            <p>
              The fort showcases a blend of Mughal, Persian, and Indian architecture. It includes multiple layers of fortification, ancient temples, a mosque, and breathtaking views of the surrounding hills.
            </p>
            <p>
              Due to its height and strength, the fort was considered almost impregnable and has a rich legacy involving emperors like Akbar and Aurangzeb.
            </p>
          </motion.section>

          {/* Address */}
          <motion.section
            className="bg-gray-50 p-6 rounded-xl shadow-sm"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1.5}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📍 Address</h2>
            <p className="text-gray-700 text-base">
              Asirgarh Fort, Asha Devi Rd, Burhanpur, Madhya Pradesh 450331, India
            </p>
          </motion.section>

          {/* Historical Significance */}
          <motion.section
            className="space-y-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <h2 className="text-2xl font-semibold text-gray-800">📜 Historical Significance</h2>
            <ul className="list-disc pl-5 text-gray-700 text-base">
              <li><strong>Built by:</strong> Asa Ahir in the early 15th century.</li>
              <li><strong>Captured by:</strong> Emperor Akbar in 1601 during his Deccan campaigns.</li>
              <li><strong>Structures:</strong> Hindu temples, a mosque built by Aurangzeb, and water reservoirs.</li>
              <li><strong>Strategic Use:</strong> Controlled the route to southern India.</li>
            </ul>
          </motion.section>

          {/* Attractions Nearby */}
          <motion.section
            className="space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2.5}
          >
            <h2 className="text-2xl font-semibold text-gray-800">🏞️ Nearby Attractions</h2>
            <ul className="list-disc pl-5 text-gray-700 text-base">
              <li><strong>Dargah-e-Hakimi:</strong> Pilgrimage site close to the fort.</li>
              <li><strong>Shahi Qila:</strong> Mughal-era palace near Tapti River.</li>
              <li><strong>Tapti River:</strong> Scenic riverbank views from the fort heights.</li>
            </ul>
          </motion.section>

          {/* Map */}
          <motion.section
            className="rounded-xl overflow-hidden shadow-md"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🗺️ Location Map</h2>
            <iframe
              title="Asirgarh Fort Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.1131047267313!2d76.24363027470993!3d21.558874071712496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd8350f1214b5e5%3A0xa93ce937fdbd1c44!2sAsirgarh%20Fort!5e0!3m2!1sen!2sin!4v1689853673266!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.section>
        </motion.div>
      )}
    </div>
  );
};

export default AsirgarhFort;

