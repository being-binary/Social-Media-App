import React from 'react'
import { FaCamera } from "react-icons/fa6";
import { toasterror, toastsuccess } from './Toast';
import axiosInstance from '../api/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from '../app/slices/UserSlice';
import { Link, useLocation } from 'react-router-dom';
import ButtonResponsive from './responsiveAntComponent/ButtonResponsive'
import { Button } from 'antd';
import { BiLogoGmail } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiSolidMessageDetail  } from "react-icons/bi";
import { BiSolidUserCheck } from "react-icons/bi";
import { BiSolidUserPlus } from "react-icons/bi";
import { BsFileEarmarkPost } from "react-icons/bs";
const SidebarComponent = (props) => {

    const location = useLocation()
    const urlCheck2 = location.pathname === '/user/friend'
    
    const { entity, fetchFriendDetails } = props.value
    const user = useSelector((state) => state.user)
    console.log(user?._id, entity?._id)
    const isfollowing = entity?.followers?.includes(user.entities?._id)
    
    const dispatch = useDispatch()
    const handleUpload = async (e) => {
        try {
            const formdata = new FormData()
            formdata.append('file', e.target.files[0])
            formdata.append('upload_preset', import.meta.VITE_UPLOAD_PRESET)
            const res = await fetch(import.meta.VITE_CLOUDINARY_LINK, {
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
        <aside className=' rounded-md border-2 border-blue-300 h-full md:flex flex-col items-center fixed  lg:w-[300px] w-[100px] hidden lg:gap-0 gap-10'>
            <div className='lg:h-50 h-15 lg:w-50 w-15  bg-white rounded-full mt-5 relative'>
                <img src={entity?.profilePic?.secure_url} alt="" className='rounded-full' />
                <label htmlFor="profile">
                    <FaCamera className='absolute lg:bottom-0 top-[65px] lg:left-full left-5 text-2xl cursor-pointer' />
                </label>
                <input type="file" name="profile" id="profile" hidden onChange={handleUpload} />
            </div>
            <div className=' mt-5 flex flex-col items-center gap-3'>
                <h1 className='lg:text-2xl text-lg capitalize font-semibold text-center'><span>{entity.name?.firstName}&nbsp;{entity.name?.lastName}</span></h1>
                <p className='text-xl text-center mt-2 lg:block hidden'>{entity.email}</p>
                <BiLogoGmail className='lg:hidden block text-[40px]'/>
                <ul className=' mt-3 lg:block hidden'>
                    <li className='text-xl'><p>Bio</p><span>{entity.bio}</span></li>
                </ul>
                <BiSolidUserCircle className='lg:hidden block text-[40px]'/>
        
                {entity?._id == user.entities?._id && <div ><ButtonResponsive className='lg:block hidden' path={'/post/userpost'} text={'View My Post'} /><Link to={'/post/userpost'}><BsFileEarmarkPost className='lg:hidden block text-[40px]'/> </Link></div>}
                {(entity?._id != user.entities?._id && entity) && <Link to={'/chat'} state={entity?._id} className='lg:bg-blue-500/50 block lg:hover:bg-blue-800/55 hover:text-white  w-full text-center py-2 my-3 font-semibold text-lg text-blue-800 capitalize rounded-lg' > <span className='lg:block hidden'>MESSAGE ME!!</span> <BiSolidMessageDetail   className='m-auto lg:hidden block text-[40px]'/></Link>}
                
            </div>
            <div className='flex lg:flex-row flex-col lg:justify-evenly items-center lg:gap-0 gap-5 w-full '>
                <div>
                    <p className='text-xl font-semibold text-gray-500 lg:block hidden'>Followers</p>
                    <BiSolidUserCheck className='lg:hidden block text-[40px]   '/>
                    <p className='text-center text-xl'>{entity?.followers?.length}</p>
                </div>
                <div>
                    <p className='text-xl font-semibold text-gray-500 lg:block hidden'>Followings</p>
                    <BiSolidUserPlus className='lg:hidden block text-[40px]'/>
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
