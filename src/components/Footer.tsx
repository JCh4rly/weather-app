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

  const handleSelect = (item: any) => dispatch(setCurrentCategory(item));

  const WeatherItem = ({ item, selected, onSelect }: any) => <>
    <Card sx={{ background: selected ? '#ddd' : '', cursor: 'pointer' }} onClick={() => onSelect(item)}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>{ formatDate(item.date) }</p>
          <img src={`http://openweathermap.org/img/wn/${item.currentItem?.weather[0]?.icon}@2x.png`} alt="weather-logo"/>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <TempView temp={item.max} />
            <TempView temp={item.min} />
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
          selected={item.date === currentCategory.date}
          onSelect={handleSelect}
        />) 
      }
    </Box>
  </>
}

export default Footer;