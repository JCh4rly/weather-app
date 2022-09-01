import { Box } from "@mui/system";
import { useSelector } from "react-redux";

interface HeaderProps {
  onChangeLocation: any,
}

const Header = ({ onChangeLocation }: HeaderProps) => {
  const weatherData = useSelector((state: any) => state.weather.weatherData.data);
  const currentItem = useSelector((state: any) => state.weather.currentItem);
  const { main, weather } = currentItem;
  const { city } = weatherData;
  const description = weather[0].description;

  const CurrentWeather = () => <>
    <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="weather-logo"/>
    <Box sx={{ fontSize: 24 }}>{ Math.round(main.temp) }°C</Box>
  </>
  
  const CurrentLocation = () => <>
    <Box>
      <div>{ city.name }</div>
      <div>{ new Date().toLocaleString() }</div>
      <div>{ description.charAt(0).toUpperCase() + description.slice(1) }</div>
    </Box>
  </>

  return <>
    <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 100}}>
      <CurrentWeather />
      <Box sx={{ flex: 1 }} />
      <CurrentLocation />
    </Box>
  </>
}

export default Header;
