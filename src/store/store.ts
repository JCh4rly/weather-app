import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../slice/weatherSlice'

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
})