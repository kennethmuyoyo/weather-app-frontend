import { WeatherData } from "@/types/Weather";

const API_URL = 'https://weather-app-backend-e94v.onrender.com/api';

export async function fetchWeatherData(city: string, units: 'metric' | 'imperial'): Promise<WeatherData> {
  const response = await fetch(`${API_URL}/weather?city=${encodeURIComponent(city)}&units=${units}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
}