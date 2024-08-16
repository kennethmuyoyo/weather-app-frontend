"use client"
import React from 'react';
import { SearchBox } from '../components/SearchBox';
import { CurrentWeather } from '../components/CurrentWeather';
import { ForecastDisplay } from '../components/ForecastDisplay';
import { WeatherCard } from '../components/WeatherCard';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { Switch } from '@headlessui/react';
import { useWeather } from '../utils/WeatherHooks';

export default function Home() {
  const {
    weatherData,
    unit,
    error,
    loading,
    backgroundImage,
    handleSearch,
    toggleUnit
  } = useWeather();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="min-h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div className="container mx-auto p-8">
          <div className="mt-10 mb-8 flex items-center justify-between">
            <div className="flex-grow mr-4">
              <SearchBox onSearch={handleSearch} />
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-white">°F</span>
              <Switch
                checked={unit === 'metric'}
                onChange={toggleUnit}
                className={`${
                  unit === 'metric' ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Toggle temperature unit</span>
                <span
                  className={`${
                    unit === 'metric' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <span className="ml-2 text-white">°C</span>
            </div>
          </div>
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {weatherData && (
            <div className="mt-20 flex flex-col lg:flex-row">
              <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-4">
                <h3 className="text-2xl font-bold mb-4 text-white">3-Day Forecast</h3>
                <ForecastDisplay forecast={weatherData.forecast} unit={unit} isLoading={loading} />
              </div>
              <div className="mt-14 lg:w-3/4 space-y-8">
                <CurrentWeather data={weatherData} unit={unit} isLoading={loading} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WeatherCard 
                    title="Humidity" 
                    value={weatherData.current.humidity.toString()} 
                    unit="%" 
                    icon={<WiHumidity />} 
                    isHumidity={true} 
                    isLoading={loading}
                  />
                  <WeatherCard 
                    title="Wind Status" 
                    value={weatherData.current.wind.speed.toString()} 
                    unit={unit === 'metric' ? 'm/s' : 'mph'} 
                    icon={<WiStrongWind />} 
                    isLoading={loading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}