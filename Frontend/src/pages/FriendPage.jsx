import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SidebarComponent from '../components/SidebarComponent'
import MainBarComponent from '../components/MainBarComponent'
import axiosInstance from '../api/AxiosInstance'
import { useLocation } from 'react-router-dom'

const FriendPage = () => {
    const [frienddetails, setfriendDetails] = useState([]);
    const [friendposts, setfriendPosts] = useState([]);
    const location = useLocation()
    const  friend_id  = location.state
    const fetchFriendDetails = async ()=>{
        const res =  await axiosInstance.post(`/action/getfriend/${friend_id}`)
        const data = res.data
        setfriendDetails(data.details.user)
        setfriendPosts(data.details.posts)
    }

    useEffect(()=>{
        fetchFriendDetails()
    },[])
    return (
        <div className='container m-auto lg:px-20 gap-2  bg-green-300 '>
            <SidebarComponent value={{ entity: frienddetails,  fetchFriendDetails }} />
            <MainBarComponent value={{userPosts : friendposts}} />
        </div>
    )
}

export default FriendPage
