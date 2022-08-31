interface UseWeatherProps {
  data: {
    temp: number
  } | null,
  loading: boolean,
}

const useWeather = (location: any): UseWeatherProps => {
  if (!location) {
    return {
      data: null,
      loading: false,
    }
  }

  const data = {
    temp: 12
  }

  return {
    data,
    loading: false,
  }
}

export default useWeather;
