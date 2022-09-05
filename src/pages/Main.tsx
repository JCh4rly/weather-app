import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useLocations from "../hooks/UseLocations";
import useWeather from "../hooks/UseWeather";
import { setCurrentCategory, setCurrentLocation, setLocations, setWeatherCategories, setWeatherData } from "../slice/weatherSlice";
import { getWeatherCategories } from "../util/util";

const MainPage = () => {
  const { locations, deviceLocation, deviceLocationLoading } = useLocations();
  const currentCategory = useSelector((state: any) => state.weather.currentCategory);
  const location = useSelector((state: any) => state.weather.location);
  const { data, loading } = useWeather(location);
  const dispatch = useDispatch();

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
      const categories = getWeatherCategories(data);
      const currentCategory = categories[0];

      dispatch(setWeatherCategories(categories));
      dispatch(setCurrentCategory(currentCategory));
      dispatch(setWeatherData({ data, location }));
    }
  }, [data])

  if (!currentCategory) {
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
