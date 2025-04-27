import React from "react";
import { Form, Input, Button, Flex } from "antd";
import image from '../assets/images/signup.png';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../api/AxiosInstance";
import { Link } from 'react-router-dom'
import { toasterror, toastinfo } from "../components/Toast";

const Signup = () => {
  const toastId = React.useRef(null);
  const onFinish = async (values) => {
    delete values.cpassword
    try {
      const res = await axiosInstance.request({
        method: "POST",
        url: "/user/signup",
        data: values,
      })
      .then((res) => {
        toastinfo(`${res.data.msg}`)
      }).catch((err) => {
        console.log(err)
        toasterror(err.response.data.msg);
      })
    } catch (err) {
      toasterror(`${err.message}`);
      
    }
  }

  return (
    <main className="flex items-center justify-center  w-[1328px] h-[720px] ">
      <div className="bg-green-300 flex flex-row w-[85%] h-[90%]  gap-2 container p-5 rounded-4xl b">
        <div className="w-2/3 rounded-4xl">
          <img src={image} alt="" />
        </div>
        <div className="w-1/2 bg-white rounded-4xl flex flex-col justify-between items-center py-2 border border-gray-200 shadow-sm ">
          <legend className="text-3xl capitalize">create an account</legend>
          <div className="border-2 border-gray-300 rounded-2xl mt-1 mx-2 p-2  shadow-sm" >
            <Form layout="vertical" onFinish={onFinish}>
              <div style={{ display: "flex", gap: "10px" }}>
                <Form.Item
                  label={<p className="text-xl capitalize font-semibold">first name</p>}
                  name="firstName"
                  rules={[{ required: true, message: "Please input your first name!" }]}
                  style={{ flex: 1, }}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label={<p className="text-xl capitalize font-semibold">last name</p>}
                  name="lastName"
                  rules={[{ required: true, message: "Please input your last name!" }]}
                  style={{ flex: 1 }}
                >
                  <Input size="large" />
                </Form.Item>
              </div>

              <Form.Item
                label={<p className="text-xl capitalize font-semibold">Email</p>}
                name="email"

                rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label={<p className="text-xl capitalize font-semibold">password</p>}
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item
                label={<p className="text-xl capitalize font-semibold">comfirm passowrd</p>}
                name="cpassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" className="text-3xl font-semibold">
                  Submit
                </Button>
              </Form.Item>

            </Form>
          </div>
          <div className="flex flex-row justify-center items-center gap-10 h-12 w-full mt-1">
            <button className="bg-blue-100/50 px-4 py-3 rounded-3xl ring-1 ring-blue-300 capitalize font-semibold text-blue-500">other methods</button>
            <p className="text-[15px] capitalize">have an account <Link to={'/user/login'} className="text-blue-700 hover:underline dark:text-blue-500">login here</Link></p>
          </div>
        </div>
      </div>
    </main>

  )
};

export default Signup;
