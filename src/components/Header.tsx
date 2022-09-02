import { Card, CardContent, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import LocationSelect from "./header/LocationSelect";

const Header = () => {
  
  const weatherData = useSelector((state: any) => state.weather.weatherData.data);
  const currentItem = useSelector((state: any) => state.weather.currentItem);
  const { main, weather } = currentItem;
  const { city } = weatherData;
  const description = weather[0].description;

  const CurrentWeather = () => <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
      <Box sx={{ fontSize: 24, display: 'flex', alignContent: 'center' }}>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="weather-logo"/>
        <div>{ Math.round(main.temp) }°C</div>
      </Box>
      <div>{ description.charAt(0).toUpperCase() + description.slice(1) }</div>
    </Box>
  </>
  
  const CurrentLocation = () => <>
    <Box>
    </Box>
  </>

  return <>
    <Card sx={{ margin: 2 }}>
      <CardHeader
        action={<LocationSelect />}
        title={city.name}
        subheader={new Date().toLocaleString()}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 100}}>
          <CurrentWeather />
          <Box sx={{ flex: 1 }} />
          <CurrentLocation />
        </Box>
      </CardContent>
    </Card>
  </>
}

export default Header;
