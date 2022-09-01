import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useLocations, { LocationItem } from "../hooks/UseLocations";
import useWeather from "../hooks/UseWeather";
import { setCurrentItem, setWeatherData } from "../slice/weatherSlice";

const MainPage = () => {
  const { locations, deviceLocation, deviceLocationLoading } = useLocations();
  const currentDate = useSelector((state: any) => state.weather.currentDate);
  const currentItem = useSelector((state: any) => state.weather.currentItem);
  const [location, setLocation] = useState<LocationItem | null>(null);
  const { data, loading } = useWeather(location);
  const dispatch = useDispatch();

  const selectCurrentItem = (data: any) => {
    if (!currentDate) {
      return data.list[0];
    }
  };

  const onChangeLocation = (location: any) => setLocation(location);

  useEffect(() => {
    if (!deviceLocationLoading) {
      // Inicializar location con deviceLocation.
      !location && setLocation(deviceLocation);
      // Inicializar lista de locations.
      //dispatch(setLocations(locations));
    }
  }, [deviceLocation]);

  useEffect(() => {
    if (data) {
      dispatch(setWeatherData({ data, location }));
      dispatch(setCurrentItem(selectCurrentItem(data)));
      console.log(data);
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
          <Header onChangeLocation={onChangeLocation} />
          <Footer/>
        </Box>
      </Grid>
    </Grid>
  </>
}

export default MainPage;
