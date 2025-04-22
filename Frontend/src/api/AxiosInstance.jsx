import axios from 'axios'
import {updateloading} from '../app/slices/UserSlice'
import { toasterror, toastsuccess, toastwarning } from '../components/Toast';
import url from '../../select_url';
const axiosInstance = axios.create({
    baseURL : url,
    headers : {
        "Content-Type" : "application/json"
    },
    withCredentials: true,
    cors: true,
    
})

export const setupInterceptors = (dispatch)=>{
    axiosInstance.interceptors.request.use( function (config) {
        const user = JSON.parse(localStorage.getItem('authkey')) || '';

        dispatch(updateloading(true))
        if(user.token){
            config.headers.Authorization = `Bearer ${user.token}`;
        }   
        return config;
    }, function (error) {
        console.log(error)
        dispatch(updateloading(false))
        return Promise.reject(error);
    } );
    
    axiosInstance.interceptors.response.use( function (response) {
        dispatch(updateloading(false))
        return response;
    }, function (error) {
        console.log(error)
        dispatch(updateloading(false))
        return Promise.reject(error);
    })
}



export default axiosInstance