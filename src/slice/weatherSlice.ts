import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentDate: null,
    currentItem: null,
    location: null,
    locations: [],
    weatherData: {
      location: null,
      data: null,
    }
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload
    },
    setLocations: (state, action) => {
      state.locations = action.payload
    },
    setCurrentLocation: (state, action) => {      
      state.location = action.payload
    },
  },
})

export const { setWeatherData, setCurrentItem, setCurrentDate, 
  setLocations, setCurrentLocation } = weatherSlice.actions

export default weatherSlice.reducer