import { useEffect, useState } from "react";
import { LocationItem } from "./UseLocations"
//import sampleResponse from "../sampleResponse.json"
import { getWeather } from "../constants/endpoints";

interface UseWeatherProps {
  data: any,
  loading: boolean,
  errors: any,
}

const useWeather = (location: LocationItem | null): UseWeatherProps => {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (location) {
      setLoading(true);
       fetch(getWeather(location))
        .then(res => {
          if (!res || !res.ok) {
            throw new Error('Se ha producido un error inesperado.');
          }
          return res.json();
        })
        .then(data => setWeatherData(data))
        .catch(error => setErrors(error))
        .finally(() => setLoading(false));
      // new Promise((resolve) => {
      //   resolve(sampleResponse)
      // })
      //   .then((data: any) => setWeatherData(data))
      //   .finally(() => setLoading(false));
    }
  }, [location])

  if (!location) {
    return {
      data: null,
      loading: false,
      errors: null,
    }
  }

  return {
    data: weatherData,
    loading,
    errors,
  }
}

export default useWeather;
