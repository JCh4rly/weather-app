import { Box, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCategory } from "../slice/weatherSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const weatherCategories = useSelector((state: any) => state.weather.categories);
  const currentCategory = useSelector((state: any) => state.weather.currentCategory);
  
  const TempView = ({ temp }: any) => <div>
    { Math.round(temp) }°C
  </div>

  const formatDate = (date: string) => {
    const [y, m, d] = date.split("-");
    return `${d}/${m}/${y}`;
  }

  const handleSelect = (date: string) => dispatch(setCurrentCategory(date));

  const WeatherItem = ({ item: { date, icon, min, max }, selected, onSelect }: any) => <>
    <Card sx={{ background: selected ? '#ddd' : '', cursor: 'pointer' }} onClick={() => onSelect(date)}>
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
      { weatherCategories.map((item: any, index: number) => 
        <WeatherItem 
          key={index} 
          item={item} 
          selected={item.date === currentCategory}
          onSelect={handleSelect}
        />) 
      }
    </Box>
  </>
}

export default Footer;