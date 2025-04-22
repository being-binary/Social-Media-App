import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setuserlogout } from '../app/slices/UserSlice'
const Logout = () => {
    const dispatch = useDispatch()
    dispatch(setuserlogout())
    return (
    <div>
        <p>you have been logged out <Link to={'/user/login'}>....login again</Link></p>
    </div>
  )
}

export default Logout
