import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

interface WeatherCardProps {
  title: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
  isHumidity?: boolean;
  isLoading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ title, value, unit, icon, isLoading, isHumidity = false }) => {
  const numericValue = parseFloat(value);

  if (isLoading) {
    return (
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  if (!value) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-4xl font-bold mb-2">
        {value}
        {unit && <span className="text-2xl ml-1">{unit}</span>}
      </p>
      {isHumidity && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
          <motion.div 
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${numericValue}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      )}
    </motion.div>
  );
};