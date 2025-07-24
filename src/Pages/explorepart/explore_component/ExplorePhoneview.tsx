import React from 'react';
import railway from '../../../../public/assets/railway.jpg';
import Sahikila from '../../../../public/assets/shahiqila.jpg';
import dargah from '../../../../public/assets/Dargah.jpg';;
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import CityMap from './CityMap';
import UploadButton from '@/components/ui/upload-button';

interface Place {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  button: React.ReactNode;
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const ExplorePhoneview: React.FC = () => {
  const places: Place[] = [
    {
      id: 1,
      title: 'Burhanpur Railway Station',
      subtitle: 'A Historic Gateway',
      description:
        "Connecting Burhanpur to major cities, the station reflects colonial-era architecture and plays a vital role in the city's cultural and historical significance.",
      image: railway,
      button: (
        <Link to="/railway-station" key="btn1" aria-label="Visit Burhanpur Railway Station page">
          <UploadButton />
        </Link>
      ),
    },
    {
      id: 2,
      title: 'Shahi Qila',
      subtitle: 'Royal Fort of Burhanpur',
      description:
        'Built on the banks of the Tapti River, Shahi Qila showcases stunning Mughal architecture and once served as a royal residence.',
      image: Sahikila,
      button: (
        <Link to="/ShahiQila" key="btn2" aria-label="Visit Shahi Qila page">
          <UploadButton />
        </Link>
      ),
    },
    {
      id: 3,
      title: 'Dargah-e-Hakimi',
      subtitle: 'Spiritual Center',
      description:
        'A revered pilgrimage site for the Dawoodi Bohra community, known for its peaceful surroundings and elegant white marble structures.',
      image: dargah,
      button: (
        <Link to="/DargahHakimi" key="btn3" aria-label="Visit Dargah-e-Hakimi page">
          <UploadButton />
        </Link>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 space-y-14">
      {/* City Map */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-lg border"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CityMap />
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.map((place, i) => (
          <motion.div
            key={place.id}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.15)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-2xl shadow-md transition duration-300 overflow-hidden flex flex-col"
          >
            <img src={place.image} alt={place.title} className="w-full h-56 object-cover" />
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{place.title}</h2>
                <h3 className="text-sm text-gray-500 mb-2">{place.subtitle}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{place.description}</p>
              </div>
              <div>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  {place.button}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePhoneview;
