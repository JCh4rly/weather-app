import { LocationItem } from "../hooks/UseLocations";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const APPID = 'a29670b9a0907b9f1f025a5100e275d8';
const units = 'metric';
const lang = 'es';

export const getWeather = (location: LocationItem) => {
  const { latitude, longitude } = location;
  return `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&APPID=${APPID}`;
};