import { createSlice } from '@reduxjs/toolkit'
import socket from '../../api/SocketInstance'

export const SocketSlice  = createSlice({
  name: 'socket',
  initialState: {
    isConnected:false
  },
  reducers: {
    connectSocket: (state, action) => {
        console.log('hello')
        if(!state.isConnected){
            const uid = action.payload
            socket.connect()
            state.isConnected = true
            socket.emit('newuser', uid)
        }
    },
    disconnectSocket: (state, action) => {
        if(state.isConnected){
            socket.disconnect()
            state.isConnected = false
        }
    }
  }
})

// Action creators are generated for each case reducer function
export const { connectSocket, disconnectSocket } = SocketSlice.actions

export default SocketSlice.reducer

export {
    socket
}