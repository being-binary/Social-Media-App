import { React, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import SidebarComponent from './SidebarComponent'
import MainBarComponent from './MainBarComponent'
import axiosInstance from '../api/AxiosInstance'

const UserPostComponent = () => {

    const user = useSelector((state) => state.user)
    const [userPosts, setUserPosts] = useState([]);

    const userPost = async () => {
        const response = await axiosInstance.get('/post/getalluserpost')
        const data = response.data
        console.log(data)
        setUserPosts(data.posts)
    }
    useEffect(() => {
        userPost()
    }, [])

    return (
        <div className='container m-auto lg:px-20 gap-2  bg-green-300 '>
            <SidebarComponent value={{ entity: user.entities }} />
            <MainBarComponent value={{userPosts}} />
        </div>
    )
}

export default UserPostComponent
