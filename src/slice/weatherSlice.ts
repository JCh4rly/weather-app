import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentCategory: null,
    categories: [],
    currentItem: null,
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
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload
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

export const { setWeatherData, setCurrentItem, setCurrentCategory, 
  setLocations, setCurrentLocation, setWeatherCategories } = weatherSlice.actions

export default weatherSlice.reducer