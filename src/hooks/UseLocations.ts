import { useGeolocated } from "react-geolocated";

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

  return {
    locations: [], 
    deviceLocation: { name: 'Current location', latitude, longitude }, 
    deviceLocationLoading: false,
  }
}

export default useLocations;
