import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useLocations from "../hooks/UseLocations";
import useWeather from "../hooks/UseWeather";
import { setCurrentItem, setCurrentLocation, setLocations, setWeatherData } from "../slice/weatherSlice";

const MainPage = () => {
  const { locations, deviceLocation, deviceLocationLoading } = useLocations();
  const currentDate = useSelector((state: any) => state.weather.currentDate);
  const currentItem = useSelector((state: any) => state.weather.currentItem);
  const location = useSelector((state: any) => state.weather.location);
  const { data, loading } = useWeather(location);
  const dispatch = useDispatch();

  const selectCurrentItem = (data: any) => {
    return data.list[0];
    
  };
  
  useEffect(() => {
    if (!deviceLocationLoading && deviceLocation) {      
      // Inicializar location con deviceLocation.
      !location && dispatch(setCurrentLocation(deviceLocation));
      // Inicializar lista de locations.
      dispatch(setLocations(locations));
    }
  }, [deviceLocation]);

  useEffect(() => {
    console.log(data);
    if (data) {
      dispatch(setWeatherData({ data, location }));
      dispatch(setCurrentItem(selectCurrentItem(data)));
    }
  }, [data])

  if (!currentItem) {
    return null;
  }

  return <>
    <Grid container spacing={1}>
      <Grid item md={3}></Grid>
      <Grid item sm={12} md={6}>
        <Box>
          <Header/>
          <Footer/>
        </Box>
      </Grid>
    </Grid>
  </>
}

export default MainPage;
