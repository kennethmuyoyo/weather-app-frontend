import React from 'react';
import { WeatherData } from '../types/Weather';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';

interface CurrentWeatherProps {
  data: WeatherData | null;
  unit: 'metric' | 'imperial';
  isLoading: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit, isLoading }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  if (isLoading) {
    return (
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg flex justify-center items-center">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">{data.location.name}</h2>
        </div>
        <p className="text-xl mt-4 md:mt-0">{new Date(data.current.date * 1000).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-6 md:mb-0">
          <Image
            src={`http://openweathermap.org/img/wn/${data.current.icon}@4x.png`}
            alt={data.current.description}
            width={120}
            height={120}
          />
          <div className="ml-4">
            <p className="text-6xl font-bold">{data.current.temp.toFixed(1)}{tempUnit}</p>
            <p className="text-2xl capitalize">{data.current.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg opacity-75">Feels Like</p>
            <p className="text-2xl font-semibold">{data.current.feels_like.toFixed(1)}{tempUnit}</p>
          </div>
          <div>
            <p className="text-lg opacity-75">Pressure</p>
            <p className="text-2xl font-semibold">{data.current.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};