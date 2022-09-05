import { Card, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import LocationSelect from "./header/LocationSelect";
import WindIcon from '@mui/icons-material/Air';
import HumidityIcon from '@mui/icons-material/Grain';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TempIcon from '@mui/icons-material/Thermostat';

const Header = () => {
  const weatherData = useSelector((state: any) => state.weather.weatherData.data);
  const currentCategory = useSelector((state: any) => state.weather.currentCategory);
  const { currentItem } = currentCategory;
  const { main, weather, wind, visibility } = currentItem;
  const { city } = weatherData;
  const description = weather[0].description;
  const now = new Date().toLocaleString();

  const CurrentWeather = () => <>
    <Box sx={{ display: 'flex', alignContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 120 }}>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="weather-logo" width="100%" />
        <Box sx={{ textAlign: 'center' }}>
          <div>{ description.charAt(0).toUpperCase() + description.slice(1) }</div>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 5 }}>
        <Box sx={{ display: 'flex' }}>
          <TempIcon />
          <div>{ Math.round(main.temp) } °C</div>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <WindIcon />
          <div>{ Math.round(wind.speed) } km/h</div>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <HumidityIcon />
          <div>{ Math.round(main.humidity) } %</div>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <VisibilityIcon />
          <div>{ Math.round(visibility / 1000) } km</div>
        </Box>
      </Box>
    </Box>
  </>
  
  const formatDate = (date: string) => {
    const [dateStr, timeStr] = date.split(',')
    const [m, d, y] = dateStr.split('/');

    return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}, ${timeStr}`;
  }

  return <>
    <Card sx={{ margin: 2 }}>
      <CardHeader
        action={<LocationSelect />}
        title={`${city?.name}, ${city?.country}`}
        subheader={formatDate(now)}
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 100}}>
          <CurrentWeather />
        </Box>
      </CardContent>
    </Card>
  </>
}

export default Header;
