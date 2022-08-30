import { Box } from "@mui/system";

const CurrentWeather = () => <>
    <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="weather-logo"/>
    <Box sx={{ fontSize: 24 }}>12°C</Box>
</>

const CurrentLocation = () => <>
  <Box>
    <div>Current Location</div>
    <div>martes, 10.00</div>
    <div>Mayormente soleado</div>
  </Box>
</>

const Header = () => {
  return <>
    <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 100}}>
      <CurrentWeather />
      <Box sx={{ flex: 1 }} />
      <CurrentLocation />
    </Box>
  </>
}

export default Header;
