import React from 'react';
import { WeatherData } from '../types/Weather';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WiThermometer } from 'react-icons/wi';
import { FaSpinner } from 'react-icons/fa';

interface ForecastDisplayProps {
  forecast: WeatherData['forecast'];
  unit: 'metric' | 'imperial';
  isLoading: boolean;
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast, unit, isLoading }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  if (isLoading) {
    return (
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  if (!forecast) {
    return null;
  }


  return (
    <div className="grid grid-cols-1 gap-4">
      {forecast.map((day, index) => (
        <motion.div
          key={day.date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg font-semibold">
                {new Date(day.date * 1000).toLocaleDateString(undefined, { weekday: 'long' })}
              </p>
              <p className="text-sm opacity-75">
                {new Date(day.date * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <Image
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              width={60}
              height={60}
            />
          </div>
          <p className="text-xl mb-2 capitalize">{day.description}</p>
          <div className="flex items-center mb-2">
            <WiThermometer className="text-2xl mr-2" />
            <p className="text-lg">
              <span className="font-bold">{day.temp_max.toFixed(1)}</span>
              <span className="text-sm ml-1">{tempUnit}</span>
              <span className="mx-2">/</span>
              <span className="opacity-75">{day.temp_min.toFixed(1)}</span>
              <span className="text-sm ml-1 opacity-75">{tempUnit}</span>
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};