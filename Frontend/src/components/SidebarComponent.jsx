import React from 'react'
import { FaCamera } from "react-icons/fa6";
import { toasterror, toastsuccess } from './Toast';
import axiosInstance from '../api/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from '../app/slices/UserSlice';
import { Link, useLocation } from 'react-router-dom';
import ButtonResponsive from './responsiveAntComponent/ButtonResponsive'
import { Button } from 'antd';
const SidebarComponent = (props) => {

    const location = useLocation()
    const urlCheck2 = location.pathname === '/user/friend'
    
    const { entity, fetchFriendDetails } = props.value
    const user = useSelector((state) => state.user)
    
    const isfollowing = entity?.followers?.includes(user.entities?._id)
    
    const dispatch = useDispatch()
    const handleUpload = async (e) => {
        try {
            const formdata = new FormData()
            formdata.append('file', e.target.files[0])
            formdata.append('upload_preset', 'Base Folder')
            const res = await fetch(`https://api.cloudinary.com/v1_1/dwpggkbsx/upload`, {
                method: "POST",
                mode: "cors",
                body: formdata
            })
            const data = await res.json()
            console.log(data)
            const uploadData = {
                secure_url: data.secure_url,
                asset_id: data.asset_id
            }
            const response = await axiosInstance.put('/user/update', { profilePic: uploadData })
            const ack = response.data
            if (ack.success) {
                dispatch(fetchUserByToken())
            }

        } catch (err) {
            toasterror(err.message)
        }
    }
    const handleClick = async () => {
        try {
            const response = await axiosInstance.put('/user/followUnfollow/',{oid:entity._id});
            dispatch(fetchUserByToken())
            fetchFriendDetails()
            console.log('Success:', response.data);
            toastsuccess(response.data.msg)
        } catch (error) {
            console.error('Error:', error);
            toasterror(error.message)
        }
    }
    return (
        <aside className='bg-blue-200 h-full md:flex flex-col items-center fixed  lg:w-[300px] w-[100px] hidden   '>
            <div className='h-50 w-50 bg-white rounded-full mt-5 relative'>
                <img src={entity?.profilePic?.secure_url} alt="" />
                <label htmlFor="profile">
                    <FaCamera className='absolute bottom-0 left-full text-2xl cursor-pointer' />
                </label>
                <input type="file" name="profile" id="profile" hidden onChange={handleUpload} />
            </div>
            <div className=' mt-5'>
                <h1 className='text-2xl capitalize font-semibold text-center'><span>{entity.name?.firstName}&nbsp;{entity.name?.lastName}</span></h1>
                <p className='text-xl text-center mt-2'>{entity.email}</p>
                <ul className=' mt-3'>
                    <li className='text-xl'><p>Bio</p><span>{entity.bio}</span></li>
                </ul>
                {user?._id == user.entities?._id && <ButtonResponsive path={'/post/userpost'} text={'View My Post'} />}
                {user?._id != user.entities?._id && <Link to={'/chat'} state={entity?._id} > Chat </Link>}
            </div>
            <div className='flex flex-row justify-evenly w-full mt-5'>
                <div>
                    <p className='text-xl font-semibold text-gray-500'>Followers</p>
                    <p className='text-center text-xl'>{entity?.followers?.length}</p>
                </div>
                <div>
                    <p className='text-xl font-semibold text-gray-500'>Followings</p>
                    <p className='text-center text-xl'>{entity?.followings?.length}</p>
                </div>
            </div>

            {urlCheck2 && <Button type="primary" onClick={handleClick}>
               {!isfollowing ? 'Follow' : 'unfollow'}
            </Button>}

        </aside>
    )
}

export default SidebarComponent
