import React, { useState } from 'react'
import imagelogo from '../assets/images/img.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import axios from 'axios';
import axiosInstance from '../api/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setuserlogin } from '../app/slices/UserSlice';
import { toasterror, toastinfo } from '../components/Toast';
import ForgotPassword from './ForgetPassword';

const Login = () => {
    const [showforgetpasswordform, setshowforgetpasswordform] = useState(false);
    const dispatch = useDispatch()
    const userslice = useSelector((state) => state.user)
    const toastId = React.useRef("login");
    const onFinish = async (values) => {
        try {
            const res = await axiosInstance.request({
                method: "POST",
                url: "/user/login",
                data: values,
            }).then((res)=>{
                dispatch(setuserlogin(res.data.token))
                toastinfo(`${res.data.msg}`)    
            }).catch((err)=>{
                toasterror(`${err.response.data.msg}`);
            })
        }
        catch (error) {
            console.log(error.message)
        }
    };
    return (
        <div className='w-[1328px] h-[720px] flex items-center justify-center p-10 lg:px-40 md:px-15 sm:px-5'>
            <div className='w-full h-full bg-blue-200 rounded-4xl flex md:flex-row flex-col overflow-hidden  relative gap-2 p-4'>
                <img src={imagelogo} width={'700px'} className='h-[120%] absolute bottom-2 right-[45%] md:block hidden' />
                <div className='block md:h-full h-[400px] md:w-1/2 sm:w-full rounded-4xl '>
                </div>
                <div className='h-full md:w-1/2 sm:w-full bg-white rounded-4xl flex flex-col items-center justify-center gap-5'>
                   { !showforgetpasswordform ? <legend className='text-center text-3xl font-semibold capitalize'>login</legend> : <legend className='text-center text-3xl font-semibold capitalize'>Forgot Password</legend>}
                    <div className='border-2 border-gray-300 rounded-xl w-[80%] h-[58%] px-4 pt-1'>
                        { showforgetpasswordform ? <ForgotPassword value={{setshowforgetpasswordform, showforgetpasswordform}}/> : <Form
                            name="login"
                            initialValues={{ remember: true }}
                            style={{ maxWidth: 360 }}
                            onFinish={onFinish}
                            className="w-full flex flex-col"
                            layout="vertical"
                        >
                            {/* Email Input */}
                            <Form.Item
                                label={<p className="text-xl capitalize font-semibold">Email</p>}
                                name="email"
                                rules={[{ required: true, type: "email", message: "Please enter a valid email address" },
                                { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
                                ]}
                            >
                                <Input
                                    className="border-2 border-blue-300"
                                    size="large"
                                    placeholder="Enter your email"

                                />
                            </Form.Item>

                            {/* Password Input */}
                            <Form.Item
                                label={<p className="text-xl capitalize font-semibold">Password</p>}
                                name="password"
                                rules={[{ required: true, message: "Please input your Password!" },
                                {
                                    // pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must be 8+ characters, include 1 uppercase, 1 number, and 1 special character (@$!%*?&)."
                                }
                                ]}
                            >
                                <Input
                                    suffix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                    size="large"
                                />
                            </Form.Item>

                            {/* Forgot Password */}
                            <Form.Item >
                                <Button  onClick={()=>{setshowforgetpasswordform(!showforgetpasswordform)}} >Forgot password?</Button>
                            </Form.Item>

                            {/* Login Button & Register Link */}
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button block type="primary" htmlType="submit" size='large'>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>}
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center'>
                            <hr className='flex-grow border-t border-2 w-35 border-gray-300' />
                            <span className='px-2 text-gray-600 capitalize'>or continue with</span>
                            <hr className='flex-grow border-t border-2 w-35 border-gray-300' />
                        </div>
                        <div className='flex items-center justify-center gap-5'>
                            <div className="w-15 h-15 rounded-full ring-2 ring-gray-300 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg></div>
                            <div className="w-15 h-15 rounded-full ring-2 ring-gray-300 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                            </svg></div>
                            <div className="w-15 h-15 rounded-full ring-2 ring-gray-300 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                            </svg></div>
                        </div>
                        <p className='text-md font-semibold text-center'>Don't you have an account? <Link to={'/user/signup'} className=' text-gray-500'>Sign Up here</Link></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
