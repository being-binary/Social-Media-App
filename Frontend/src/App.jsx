import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home'
import Logout from './pages/Logout'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setupInterceptors } from './api/AxiosInstance'
import Navbar from './components/Navbar';
import Loader from './components/LoaderComponenet';
import { fetchUserByToken } from './app/slices/UserSlice'
import ForgetPassword from './pages/ForgetPassword';
import UserPostComponent from './components/UserPostComponent';
import FriendPage from './pages/FriendPage'
import ChatPage from './pages/ChatPage'
import { connectSocket } from './app/slices/SocketSlice';

function App() {
  const user = useSelector((state) => state.user)
  const login = user.token ? true : false
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(login){
      dispatch(fetchUserByToken())
    }
  },[user.token])

  useEffect(() => {
    setupInterceptors(dispatch)
  }, [dispatch]);

  useEffect(()=>{
    if(user?.entities?._id){
      dispatch(connectSocket(user?.entities?._id))
    }
  },[user?.entities?._id])

  return (
    <BrowserRouter>
      <Navbar value={{login, entity: user.entities}}/>
      <div className={`${login ? 'pt-[70px]' : '' } relative`}>
        <Routes>
          <Route path='/user/login' element={!login ? <Login /> : <Navigate to={'/home'} />} />
          <Route path='/user/signup' element={!login ? <Signup /> : <Navigate to={'/home'} />} />
          <Route path='/user/forget-password' element={!login ? <ForgetPassword /> : <Navigate to={'/home'} />} />
          <Route path='/user/logout' element={login ?<Logout/> : <Navigate to={'/user/login'} />} />
          <Route path='/home' element={login ? <Home /> : <Navigate to={'/user/login'} />} />
          <Route path='/post/userpost' element={login ? <UserPostComponent /> : <Navigate to={'/user/login'} />} />
          <Route path='/user/friend' element={login ? <FriendPage /> : <Navigate to={'/user/login'} />} />
          <Route path='/chat' element={login ? <ChatPage /> : <Navigate to={'/user/login'} />} />
        </Routes>
        {user.loading && <Loader/>} 
      </div>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
