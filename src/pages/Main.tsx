import { Alert, Card, CardContent, CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import useLocations from "../hooks/UseLocations";
import useWeather from "../hooks/UseWeather";
import { setCurrentCategory, setCurrentLocation, setLocations, setWeatherCategories, setWeatherData } from "../slice/weatherSlice";
import { getWeatherCategories } from "../util/util";

const MainPage = () => {
  const { locations, deviceLocation, deviceLocationLoading } = useLocations();
  const currentCategory = useSelector((state: any) => state.weather.currentCategory);
  const location = useSelector((state: any) => state.weather.location);
  const { data, loading, errors } = useWeather(location);
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
    if (data) {
      const categories = getWeatherCategories(data);
      const currentCategory = categories[0];

      dispatch(setWeatherCategories(categories));
      dispatch(setCurrentCategory(currentCategory));
      dispatch(setWeatherData(data));
    }
  }, [data])

  interface LayoutProps {
    children: ReactElement | ReactElement[]
  }

  const Layout = ({ children }: LayoutProps) => <>
    <Grid container spacing={1} sx={{ margin: 2 }}>
      <Grid item md={3}></Grid>
      <Grid item sm={12} md={6}>
        {children}
      </Grid>
    </Grid>
  </>

  if (!deviceLocation && !deviceLocationLoading) {
    return <>
      <Layout>
        <Card>
          <CardContent>
            <Alert severity="error">No es posible obtener la ubicación actual de este dispositivo.</Alert>
          </CardContent>
        </Card>
      </Layout>
    </>
  }

  if (errors) {
    return <>
      <Layout>
        <Card>
          <CardContent>
            <Alert severity="error">{ errors.message }</Alert>
          </CardContent>
        </Card>
      </Layout>
    </>
  }

  if (!currentCategory) {
    return <>
      <Layout>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
          <p>Cargando pronóstico...</p>
        </Box>
      </Layout>
    </>
  }

  return <>
    <Layout>
      <Box>
        <Header loading={loading} />
        <Footer/>
      </Box>
    </Layout>
  </>
}

export default MainPage;
