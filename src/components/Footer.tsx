import { Box, Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";

const Footer = () => {
  const weatherData = useSelector((state: any) => state.weather.weatherData.data);
  const { list } = weatherData;
  const count = list.length;

  let currentCategory = {
    date: '',
    min: 0,
    max: 0,
    description: '',
    icon: '',
  }

  const weatherItems = list.reduce((acc: any, { dt, dt_txt, main, weather }: any, index: number) => {
    const { temp_min, temp_max } = main;
    const { description, icon } = weather[0];
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

    // Última categoría.
    if (index === count - 1) {
      acc = [ ...acc, currentCategory ];
    }

    return acc;
  }, []);

  const TempView = ({ temp }: any) => <div>
    { Math.round(temp) }°C
  </div>

  const formatDate = (date: string) => {
    const [y, m, d] = date.split("-");
    return `${d}/${m}/${y}`;
  }

  const WeatherItem = ({ item: { date, icon, min, max } }: any) => <>
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>{ formatDate(date) }</p>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-logo"/>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <TempView temp={max} />
            <TempView temp={min} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </>

  return <>
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      { weatherItems.map((item: any, index: number) => <WeatherItem key={index} item={item} />) }
    </Box>
  </>
}

export default Footer;