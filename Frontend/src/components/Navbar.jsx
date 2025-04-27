import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import axiosInstance from '../api/AxiosInstance';
const Navbar = (props) => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [searchuser, setSearchUser] = useState([]);

  const handleChange = async (e)=>{
    let value =  e.target.value
    if(!value){
      setSearchUser([])
      return
    }
    const res = await axiosInstance(`/action/finduser?name=${value}`)
    const data = res.data
    if(data.success){
      setSearchUser([...data.users])
    }
    
  }

  return (
    <nav className={`w-full h-[70px] bg-blue-500  fixed  ${!props.value.login ? 'hidden' : ''} z-50 `}>
      <div className='w-full h-full flex flex-row items-center justify-between px-10 relative '>
        <p className="text-2xl font-semibold text-white">Connectify</p>
        <GiHamburgerMenu onClick={()=>setShowNavbar(!showNavbar)} className='md:hidden block text-2xl text-white cursor-pointer hover:text-green-400 hover:scale-110 transfrom transform-transition ' />
          
        <ul className='md:flex flex-row hidden gap-5'>
        {
            props.value.login && <li className='relative'> <input type="text" name="search" id="search" className='bg-white text-black px-2 py-1 rounded-md' onChange={handleChange} />
            {
              searchuser && searchuser.map((user, index)=>{
                return <Link onClick={()=>{setSearchUser([])}} to={'/user/friend'} state={user?._id} key={index} className='absolute mt-1 p-1 top-full z-50 w-full rounded-lg flex flex-row gap-2 items-center bg-white'>
                  <img src={user?.profilePic?.secure_url} alt="" className='w-12 h-12 rounded-full' />
                  <p>{user?.name?.firstName}&nbsp;{user?.name?.lastName}</p>
                </Link>
              })
            }
            </li>
          }
          {
            props.value.login && <li className='text-xl text-white'><Link to={'/user/logout'}>Logout</Link></li>
          }
          {
            props.value.login && <li className='text-xl text-white capitalize'><p >{`${props.value.entity.name?.firstName} ${props.value.entity.name?.lastName}`}</p></li>
          }
          {
            props.value.login && <li className='text-xl text-white'><Link to={'/home'}>Home</Link></li>
          }
        </ul>
        {showNavbar && <div className='md:hidden block absolute top-[100%] left-0 w-full text-black bg-blue-400'>
          <ul>
            {
              props.value.login && <li className='text-xl text-white text-center border-t-1  py-4 tracking-wide'><Link to={'/user/logout'}>Logout</Link></li>
            }
            {
              props.value.login && <li className='text-xl text-white text-center border-t-1  py-4 tracking-wide capitalize'><Link to={''}>{`${props.value.entity.name?.firstName} ${props.value.entity.name?.lastName}`}</Link></li>
            }
            {
              props.value.login && <li className='text-xl text-white text-center border-t-1  py-4 tracking-wide'><Link to={''}>Profile</Link></li>
            }
          </ul>
        </div>}
      </div>
    </nav>
  )
}

export default Navbar
