"use client"
import { WeatherData } from '@/types/Weather';
import { useState, useEffect } from 'react';
import { fetchWeatherData } from './WeatherApi';
import { getBackgroundImage } from './backgroundImage';
import { getCityFromCoords } from './Geocoding';


export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('/images/weather_background.jpg');

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city, unit);
      setWeatherData(data);
      setBackgroundImage(getBackgroundImage(data.current.main));
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    if (weatherData) {
      handleSearch(weatherData.location.name);
    }
  }, [unit]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const city = await getCityFromCoords(position.coords.latitude, position.coords.longitude);
            handleSearch(city);
          } catch (err) {
            console.error("Error getting city:", err);
            setError("Couldn't get your location. Please search for a city.");
          }
        },
        error => {
          console.error("Error getting location:", error);
          setError("Couldn't get your location. Please search for a city.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city.");
    }
  }, []);

  return {
    weatherData,
    unit,
    error,
    loading,
    backgroundImage,
    handleSearch,
    toggleUnit
  };
};