import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/filterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})