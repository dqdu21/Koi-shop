import { message } from "antd";
import {
  Feedback,
  User,
  UserData,
  UserSearchRequest,
  UserSearchResponse,
} from "../models/Types"; // Import types and interfaces from models/Types
import { axiosInstance } from "./axiosInstance";

//--------------------------------- Get Users (Admin) ------------------------------------------
export const getUsers = async (
  requestData: UserSearchRequest
): Promise<UserSearchResponse> => {
  try {
    const response = await axiosInstance.post<UserSearchResponse>(
      '/account/get-all-account',
      requestData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------
//--------------------------------- add feedback ------------------------------------------
export const addFeedback= async (id :string,description: string, rating: number): Promise<Feedback> => {
  try {
    const response = await axiosInstance.post(`/feedback/product/${id}`,{
      description,
      rating
    },{
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------
//--------------------------------- Get feedback ------------------------------------------
export const getFeedback= async (id :string): Promise<Feedback> => {
  try {
    const response = await axiosInstance.get(`/feedback/user/${id}`)
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------
//--------------------------------- put feedback ------------------------------------------
export const putFeedback= async (idProductBuy :string, description: string, rating: number): Promise<Feedback> => {
  try {
    const response = await axiosInstance.put(`/feedback/${idProductBuy}`,{
      description,
      rating
    },{
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------
//--------------------------------- delete feedback ------------------------------------------
export const deleteFeedback= async (id :string): Promise<void> => {
  try {
    await axiosInstance.delete(`/feedback/${id}`)
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------
//------------------------------ Get User Detail ------------------------------------------------
export const getUserDetail = async (userId: string): Promise<UserData> => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    const userData: UserData = response.data.data;
    console.log('userData :>> ', userData);
    if (userData) {
      return userData;
    } else {
      throw new Error("User data not found");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An unknown error occurred";
    throw new Error(errorMessage);
  }
};
//-----------------------------------------------------------------------------------------------
//------------------------------ Get profile User ------------------------------------------------
export const getProfile = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/user/own`);
    const userData: User = response.data.result;
    if (userData) {
      return userData;
    } else {
      throw new Error("User data not found");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An unknown error occurred";
    throw new Error(errorMessage);
  }
};
//-----------------------------------------------------------------------------------------------
//--------------------------------- Delete User (Admin) -----------------------------------------
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/account/delete-account/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//--------------------------------- ChangePassword -----------------------------------------
export const changePassword = async (refreshToken: string, oldPassword: string, newPassword: string): Promise<any> => {
  console.log('refreshToken :>> ', refreshToken);
  try {
    const encodedRefreshToken = encodeURIComponent(refreshToken);

    const response =  await axiosInstance.put(`/user/change-password?token=${encodedRefreshToken}`, {
      oldPassword,
      newPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response :>> ', response);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------
//----------------------------------Create User (Public)-----------------------------------------
export const createUser = async (userData: {
  name: string;
  password: string;
  email: string;
  role?: string;
}): Promise<UserData> => {
  try {
    const response = await axiosInstance.post(
      '/users/create',
      userData,
    );

    const newUser: UserData = response.data.data; // Assuming response structure matches UserData
    console.log("Created user:", newUser);

    return newUser; // Return created user data if successful
  } catch (error: any) {
    if (error.response) {
      console.error("Create user failed", error.response.data); // Handle error if create fails
      console.error("Status", error.response.status);
      console.error("Headers", error.response.headers);
    } else if (error.request) {
      console.error("No response", error.request); // Handle error if no response
    } else {
      console.error("Fail", error.message); // Handle other errors
    }
    throw new Error(error.message);
  }
};
//-----------------------------------------------------------------------------------------------

//---------------------------------Register User (Public)----------------------------------------
export const registerUser = async (userData: Partial<User["data"]>) => {
  try {
    const res = await axiosInstance.post<User>(
      '/auth/register',
      userData,
    );
    return {
      message: (res.data as any).message,
      statusCode: (res.data as any).statusCode,
    };
  } catch (error: any) {
    if (error.response && error.response.data){
      throw new Error(error.response.data.message);
    }
    return undefined;
  }
};
//--------------------------------------------------------------------------------------------

//-------------------------------- Update User -----------------------------------------------
export const updateUser = async (
  userId: string,
  updatedUserData: Partial<UserData>,
) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/${userId}`,
      updatedUserData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const updatedUser: UserData = response.data.data;
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
//---------------------------------------------------------------------------------------------

//-------------------------------- Change Status User (Admin) ---------------------------------------
export const toggleUserStatus = async (
  user_id: string,
  status: boolean,
): Promise<void> => {
  const url = '/api/users/change-status';

  await axiosInstance.put(
    url,
    { user_id, status },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

//---------------------------------------------------------------------------------------------

export const createUserAPI = async (userData: Partial<User["data"]>) => {
  try {
    console.log("Sending user data to create:", userData);

    const res = await axiosInstance.post(
      '/api/users/create',
      userData,
    );

    console.log("User created successfully:", res.data.data);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const changeRoleAPI = async (userId: string, role: string) => {
  try {
    const res = await axiosInstance.put('/api/users/change-role', {
      user_id: userId,
      role: role,
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const reviewInstructorAPI = async (
  user_id: string,
  status: string,
  comment: string,
) => {
  try {
    const res = await axiosInstance.put(
      '/api/users/review-profile-instructor',
      { user_id, status, comment },
    );

    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  }
};

export const changePasswordAPI = async (
  user_id: string,
  old_password: string,
  new_password: string,
) => {
  try {
    const res = await axiosInstance.put(
      '/api/users/change-password',
      { user_id, old_password, new_password },
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
