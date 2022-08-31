import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useLocations, { LocationItem } from "../hooks/UseLocations";
//import useWeather from "../hooks/UseWeather";

const MainPage = () => {
  const { locations, deviceLocation, deviceLocationLoading } = useLocations();
  const [location, setLocation] = useState<LocationItem | null>();
  //const { data, loading } = useWeather(location);

  const onChangeLocation = (location: any) => setLocation(location);

  useEffect(() => {
    if (!deviceLocationLoading) {
      // Inicializar location con deviceLocation.
      !location && setLocation(deviceLocation || locations[0]);
      console.log(deviceLocation);
      // Inicializar lista de locations.
      //dispatch(setLocations(locations));
    }
  }, [deviceLocation]);


  //useEffect(() => {
    //data && dispatch(setWeatherData({ data, location }));
  //}, [data])

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
