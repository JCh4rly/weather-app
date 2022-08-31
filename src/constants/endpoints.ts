import { LocationItem } from "../hooks/UseLocations";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeather = (location: LocationItem) => {
  const { latitude, longitude } = location;
  return `${BASE_URL}?lat=${latitude}&lon=${longitude}&APPID=${''}`;
};