const weatherBackgrounds = {
    Clear: '/images/clear.png',
    Clouds: '/images/clear.png',
    Rain: '/images/clear.png',
    Snow: '/images/clear.png',
    Thunderstorm: '/images/clear.png',
    Drizzle: '/images/clear.png',
    Mist: '/images/clear.png',
    default: '/images/clear.png'
  };
  
  export function getBackgroundImage(weatherCondition: string): string {
    return weatherBackgrounds[weatherCondition as keyof typeof weatherBackgrounds] || weatherBackgrounds.default;
  }