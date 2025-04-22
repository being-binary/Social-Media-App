import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../api/AxiosInstance';
import { toasterror, toastsuccess, toastwarning } from '../../components/Toast';
import { toast } from 'react-toastify';

export const forgetpassword = createAsyncThunk(
  '/user/reset-password',
  async (payload) => {
    const response = await axiosInstance.post('/user/reset-password', payload);
    return response.data
  },
)

export const fetchUserByToken = createAsyncThunk(
  '/user/getdetails',
  async () => {
    const response = await axiosInstance.get('/user/getdetails');
    return response.data
  },
)

const initialState = {
  entities : '',
  token : JSON.parse(localStorage.getItem('authkey')) || '',
  loading : false
}
export const UserSlice = createSlice({
  name: 'counter',
  initialState ,
  reducers: {
    setuserlogin: (state, action) => {
      state.token = action.payload
      localStorage.setItem('authkey', JSON.stringify({token:action.payload}))
    },
    updateloading :(state, action) =>{
      state.loading = action.payload
    },
    setuserlogout :(state, action) =>{
      state.entities = ''
      state.token = ''
      state.loading = false
      localStorage.removeItem("authkey")
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities = action.payload.userdetails[0]
    })
    builder.addCase(fetchUserByToken.rejected, (state, action)=>{
      console.log(`Extra reducer`)
    })
    builder.addCase(forgetpassword.fulfilled, (state, action) => {
      // Add user to the state array
    })
    builder.addCase(forgetpassword.rejected, (state, action)=>{
      console.log(`Extra reducer`)
    })
  },

})

// Action creators are generated for each case reducer function
export const { setuserlogin , updateloading, extraReducers, setuserlogout} = UserSlice.actions

export default UserSlice.reducer 