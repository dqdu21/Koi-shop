import { Button, Form, Input, notification } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/usersService";

const FormSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: { fullName: string; email: string; password: string; phoneNumber: string }) => {
    const { fullName, email, password, phoneNumber } = values;
    const userData = {
      fullName,
      email,
      password,
      phoneNumber,
      avatar: "https://icons.veryicon.com/png/o/miscellaneous/icon-icon-of-ai-intelligent-dispensing/login-user-name-1.png",
    };

    try {
      setLoading(true);
      const user = await registerUser(userData);
      notification.success({
        message: "Registration Successful",
        description: "You have successfully registered!",
      });
      navigate("/sign-in");
    } catch (error: any) {
      notification.error({
        message: "Registration Failed",
        description: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
        >
          <Input className="text-sm" size="large" placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email address!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input className="text-sm" size="large" placeholder="Email address" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your phone number!" },
            { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
            { min: 10, message: "Phone number must be at least 10 digits!" },
          ]}
        >
          <Input className="text-sm" size="large" placeholder="Phone number" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter the password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            className="text-sm"
            size="large"
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "You must confirm the password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirm Password do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className="text-sm"
            size="large"
            placeholder="Confirm Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <br />
        <Form.Item>
          <Button
            loading={loading}
            htmlType="submit"
            type="primary"
            className="w-full bg-red-500 "
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormSignUp;
