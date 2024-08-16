import React from 'react';
import { WeatherData } from '../types/Weather';
import Image from 'next/image';

interface WeatherDisplayProps {
  data: WeatherData;
  unit: 'metric' | 'imperial';
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="card bg-gray-800 text-white">
      <div className="card-body">
        <h2 className="card-title text-3xl">{data.location.name}, {data.location.country}</h2>
        <p className="text-xl">{new Date(data.current.date * 1000).toLocaleDateString()}</p>
        <div className="flex items-center mt-4">
          <Image 
            src={`http://openweathermap.org/img/wn/${data.current.icon}@2x.png`}
            alt={data.current.description}
            width={100}
            height={100}
          />
          <p className="text-6xl font-bold ml-4">
            {data.current.temp.toFixed(1)}{tempUnit}
          </p>
        </div>
        <p className="text-2xl mt-4">{data.current.description}</p>
      </div>
    </div>
  );
};
