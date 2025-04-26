import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SidebarComponent from '../components/SidebarComponent'
import MainBarComponent from '../components/MainBarComponent'
import MyChats from '../components/MyChats'
const Home = () => {

  const user = useSelector((state) => state.user)

  return (
    <div className='container m-auto flex flex-row gap-2 '>
      <SidebarComponent value={{entity : user.entities}}/>
      <MainBarComponent/>
      <MyChats/>
    </div>
  )
}

export default Home
