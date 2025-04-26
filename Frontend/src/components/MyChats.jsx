import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/AxiosInstance'
import { useSelector } from 'react-redux';
import { MdStarRate } from 'react-icons/md';
import TimeAgo from './subComponents/TimeAgo';
import { Link } from 'react-router-dom';

const MyChats = () => {
  const [userMessages, setUserMessages] = useState([]);
  const user = useSelector((state) => state.user.entities)
  console.log(user)
  const getMessages = async () => {
    const response = await axiosInstance.get('/message/getmessagebyuser')
    const data = response.data
    setUserMessages(data.messages)
  }
  console.log(userMessages)
  useEffect(() => {
    getMessages()
  }, [])

  return (
    <div className='border-1 border-blue-300 ms-2 lg:w-[400px] p-2 md:block hidden fixed right-5 h-[calc(100vh-70px)] '>
      {
        userMessages.map((message, index) => {
          return (<div  className='relative flex flex-col px-2 w-full h-20 border-2 border-blue-400 shodow-blue-200 rounded-lg mb-2'>
            {message.members.map((memeber, index) => {
              return (
                <Link to={'/chat'} state={(memeber?._id != user?._id ) && memeber?._id } className='flex flex-row pt-2'>
                  {(memeber?._id != user?._id ) && <img src={memeber?.profilePic?.secure_url} alt="" className='h-10 w-10 rounded-full' /> }
                  <div className='absolute top-1 right-2'><p><TimeAgo createdAt={message?.message[0]?.createdAt} /></p></div>
                  <p className='ps-3 capitalize font-semibold text-lg text-gray-700'>{(memeber?._id != user?._id) ? memeber?.name?.firstName.concat(' ', memeber?.name?.lastName) : ''}</p>
                </Link>
              )
            })}
            <div className='absolute bottom-3 left-15 text-red-500/100 font-semibold'>
              {message.message[0]?.message}
            </div>
          </div>)
        })
      }
    </div>
  )
}

export default MyChats
