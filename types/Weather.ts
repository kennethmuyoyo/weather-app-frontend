export interface WeatherData {
    current: {
      pressure: number;
      feels_like: any;
      main: string;
      temp: number;
      description: string;
      icon: string;
      wind: {
        speed: number;
        deg: number;
      };
      humidity: number;
      date: number;
    };
    forecast: Array<{
      date: number;
      temp_min: number;
      temp_max: number;
      icon: string;
      description: string;
    }>;
    location: {
      name: string;
      country: string;
    };
  }