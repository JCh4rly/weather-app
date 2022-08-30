import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainPage = () => {
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
