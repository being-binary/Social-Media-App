import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from '../slices/UserSlice'
import  SocketSlice from '../slices/SocketSlice'
export default configureStore({
  reducer: {
    user: UserSlice,
    scoket: SocketSlice
  }
})