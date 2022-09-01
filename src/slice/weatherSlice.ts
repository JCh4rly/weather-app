import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentDate: null,
    currentItem: null,
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
  },
})

export const { setWeatherData, setCurrentItem, setCurrentDate } = weatherSlice.actions

export default weatherSlice.reducer