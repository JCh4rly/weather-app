import { useSelector } from "react-redux";

const Footer = () => {
  const weatherData = useSelector((state: any) => state.weather.weatherData.data);
  const { list } = weatherData;

  let currentCategory = {
    date: '',
    min: 0,
    max: 0,
    description: '',
    icon: '',
  }
  
  const weatherItems = list.reduce((acc: any, { dt, dt_txt, main }: any) => {
    const { temp_min, temp_max, description, icon } = main;
    const [currentDate] = dt_txt.split(' ');
    
    if (currentDate !== currentCategory.date) {
      if (currentCategory.date !== '') {
        acc = [ ...acc, currentCategory ];
      }

      currentCategory = {
        date: currentDate,
        min: temp_min,
        max: temp_max,
        description,
        icon,
      };
    } else {
      // Actualizar min y max.
      const { min, max } = currentCategory;
      const newMin = temp_min < min ? temp_min : min;
      const newMax = temp_max > max ? temp_max : max;
      
      currentCategory = { ...currentCategory, min: newMin, max: newMax };
    }

    return acc;
  }, []);

  const WeatherItem = ({ item: { date } }: any) => <>
    { date }
  </>

  return <>
    { weatherItems.map((item: any, index: number) => <WeatherItem key={index} item={item} />) }
  </>
}

export default Footer;