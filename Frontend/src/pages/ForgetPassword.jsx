import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { forgetpassword } from "../app/slices/UserSlice";

const ForgotPassword = (props) => {
    const dispatch = useDispatch()
    const onFinish = (values) => {
        // console.log("Received values: ", values);
        dispatch(forgetpassword(values))
        message.success("Password reset link sent to your email!");
    };
    const { setshowforgetpasswordform, showforgetpasswordform } =  props.value
    return (
        <div className="mt-5">
            {/* <Card className="w-96 shadow-lg p-6 rounded-xl"> */}
            <h2 className="text-2xl font-semibold text-center mb-4">Enter Your Email</h2>
            <Form name="forgot_password" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label={<p className="text-xl capitalize font-semibold">Email</p>}
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email!" },
                        { type: "email", message: "Enter a valid email!" },
                    ]}
                >
                    <Input prefix={<MailOutlined />} size="large" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" size="large" >
                        Send Reset Link
                    </Button>
                </Form.Item>
                <Form.Item >
                    <Button onClick={() => { setshowforgetpasswordform(!showforgetpasswordform) }} >Back to Login</Button>
                </Form.Item>
            </Form>
            {/* </Card> */}
        </div>
    );
};

export default ForgotPassword;
