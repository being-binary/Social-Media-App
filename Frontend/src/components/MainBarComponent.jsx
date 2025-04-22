import React, { useEffect, useState } from 'react'
import PostUploadComponent from './PostUploadComponent'
import PostCardComponent from './PostCardComponent'
import axiosInstance from '../api/AxiosInstance'
import { useLocation } from 'react-router-dom'
const MainBarComponent = (props) => {

  const location = useLocation()

  const showuserpost = props?.value?.userPosts?.length ? true : false
  const urlCheck = location.pathname === '/post/userpost'
  const urlCheck2 = location.pathname === '/user/friend'

  const [posts, setPosts] = useState([]);
  const fetchPost = async () => {
    const response = await axiosInstance.get('/post/getallpost')
    const data = response.data
    setPosts(data.posts)
  }

  useEffect(() => {
    const hasUserPosts = props?.value?.userPosts?.length > 0;
    if (urlCheck || urlCheck2) {
      setPosts([...props.value.userPosts]);
    } else {
      fetchPost();
    }
  }, [props?.value?.userPosts]);

  return (
    <div className=' lg:ms-[350px] md:ms-[150px] m-auto'>
      <div>
        <PostUploadComponent />
        {
          posts.map((post, index) => {
            return <span key={index}>
              <PostCardComponent value={{ post }} fetchPost={fetchPost} />
            </span>
          })
        }
      </div>

      {!showuserpost&&(urlCheck || urlCheck2) && <div className='h-[calc(100vh-71px)]'><p className='flex justify-center items-center font-semibold tracking-wide text-red-500 text-center w-full h-30 text-3xl uppercase '>user has no post</p></div>}
    </div>
  )
}

export default MainBarComponent
