import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState, createContext, useContext, useEffect } from "react";
import { login as loginService } from "../../services/authService";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { User } from "../../models/Types";
import { useNavigate } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/es/checkbox";

// Tạo AuthContext
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Kiểm tra token khi app khởi chạy
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Sử dụng sessionStorage
    const userData = sessionStorage.getItem('user'); // Sử dụng sessionStorage

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData)); // Phục hồi thông tin user từ sessionStorage
    }
  }, []);

  // Hàm đăng nhập
  const login = (token: string, userData: User) => {
    sessionStorage.setItem('token', token); // Lưu token vào sessionStorage
    sessionStorage.setItem('user', JSON.stringify(userData)); // Lưu user vào sessionStorage
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const FormSignIn: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRemembered, setIsRemembered] = useState<boolean>(false);
  const { login } = useAuth();

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsRemembered(e.target.checked);
  };

interface LoginUser extends User {
  role: string; // Assuming role is of type string
  email: string;
}

const handleLogin = async (values: { email: string; password: string; role: string }) => {
  try {
    setLoading(true);
    
    // Gọi API đăng nhập
    const response = await loginService(values.email, values.password, values.role);
    
    // Kiểm tra phản hồi từ API
    if (response.isSuccess && response.result.data.accessToken) {
      const token = response.result.data.accessToken;
      // Create a LoginUser object with additional properties like role
      const loginUser: LoginUser = {
        ...response.result.data.user, // Assume this has User properties
        role: response.result.data.roleId // Include role
      };
      // Extract only User properties for the context
      const { email, ...userData } = loginUser;
      
      login(token, userData); // Lưu thông tin vào context với User properties only
      sessionStorage.setItem("userEmail", email); // Store email separately
      
      notification.success({
        message: "Login Successful",
      });
      setLoading(false);
      if (values.email === "giangnnt260703@gmail.com") {
        navigate("/admin");
      } else if (values.role === "MANAGER") {
        navigate("/staff");
      } else {
        navigate("/");
      }
    }
  } catch (error: any) {
    notification.error({
      message: "Login Failed",
      description: error.message || "Invalid email or password. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="relative">
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            className="text-sm"
            size="large"
            placeholder="Email address"
            prefix={<i className="fa-solid fa-envelope"></i>}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input.Password
            className="text-sm"
            size="large"
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<i className="fa-solid fa-key"></i>}
          />
        </Form.Item>
        <div className="flex items-center justify-between">
          <Checkbox checked={isRemembered} onChange={handleCheckboxChange}>
            Remember me
          </Checkbox>
          <a
            href="/forgot-password"
            className="text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 transition duration-150 ease-in-out"
          >
            Forgot password?
          </a>
        </div>
        <br />
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="mb-4 w-full bg-red-500 text-white hover:bg-black hover:text-white"
            loading={loading}
          >
            Sign In
          </Button>

          <p className="mb-0 text-sm font-semibold">
            Don't have an account?{" "}
            <a href="sign-up" className="text-red-500">
              Sign Up
            </a>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

// Bọc FormSignIn bằng AuthProvider
const WrappedFormSignIn = () => (
  <AuthProvider>
    <FormSignIn />
  </AuthProvider>
);

export default WrappedFormSignIn;
