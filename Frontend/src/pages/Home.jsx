import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SidebarComponent from '../components/SidebarComponent'
import MainBarComponent from '../components/MainBarComponent'
const Home = () => {

  const user = useSelector((state) => state.user)

  return (
    <div className='container m-auto lg:px-20 gap-2  bg-green-300 '>
      <SidebarComponent value={{entity : user.entities}}/>
      <MainBarComponent/>
    </div>
  )
}

export default Home
