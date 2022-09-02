import { useGeolocated } from "react-geolocated";
import { locations } from "../constants/locations";

export interface LocationItem {
  name: string,
  latitude: number,
  longitude: number,
}

interface UseLocationsProps {
  locations: LocationItem[], 
  deviceLocation: LocationItem | null, 
  deviceLocationLoading: boolean,
}

const useLocations = (): UseLocationsProps => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  if (isGeolocationAvailable && isGeolocationEnabled && !coords) {
    return {
      locations: [], 
      deviceLocation: null, 
      deviceLocationLoading: true,  
    }
  }  

  if (!isGeolocationAvailable || !isGeolocationEnabled || !coords) {
    return {
      locations: [], 
      deviceLocation: null, 
      deviceLocationLoading: false,  
    }
  }

  const { latitude, longitude } = coords;
  const deviceLocation = { name: 'Current location', latitude, longitude };
  
  return {
    locations: [deviceLocation, ...locations],
    deviceLocation, 
    deviceLocationLoading: false,
  }
}

export default useLocations;
