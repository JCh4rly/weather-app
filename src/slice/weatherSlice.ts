import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentCategory: null,
    categories: [],
    location: null,
    locations: [],
    weatherData: {
      location: null,
      data: null,
    }
  },
  reducers: {
    setWeatherCategories: (state, action) => {
      state.categories = action.payload
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload
    },
    setLocations: (state, action) => {
      state.locations = action.payload
    },
    setCurrentLocation: (state, action) => {      
      state.location = action.payload
    },
  },
})

export const { setWeatherData, setCurrentCategory, setLocations, 
  setCurrentLocation, setWeatherCategories } = weatherSlice.actions

export default weatherSlice.reducer