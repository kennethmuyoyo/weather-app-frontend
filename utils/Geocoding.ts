const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/reverse';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export async function getCityFromCoords(lat: number, lon: number): Promise<string> {
  const response = await fetch(`${GEOCODING_API_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error('Failed to get city name from coordinates');
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error('No city found for the given coordinates');
  }

  return data[0].name;
}