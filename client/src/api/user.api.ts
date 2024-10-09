import axios from 'axios';
import {
  IUserCreate, IUserUpdate,
<<<<<<< HEAD
  IUserSignIn,  IUserForgetPassword, IUserResetPassword,
=======
  IUserSignIn,
  // IUser,
  // IUserForgetPassword,IUserResetPassword,
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
} from '../interfaces/domain/index';
import { BaseAPIs } from '.';

/**
 * This class contain HTTP requests to the backend API of User
 */
class UserAPIs {
  private baseUrl: string;

  constructor() {
    // Create an instance of the BaseAPIs class to get the base URL of the backend API
    const baseAPIs = new BaseAPIs();
    // Set the baseUrl property of the FindingAPIs class to the base URL of the backend API
    this.baseUrl = baseAPIs.baseUrl;
  }

  createUserApi = (user: IUserCreate) => axios.post(`${this.baseUrl}/users`, user, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

<<<<<<< HEAD
  // updateUserByIdApi = (id: string, user: IUserUpdate) => axios.put(`${this.baseUrl}/users/${id}`, user);

  // forgetUserPasswordApi = (user: IUserForgetPassword) => axios.put(`${this.baseUrl}/users/password-forget`, user);

  // resetUserPasswordApi = (user: IUserResetPassword) => axios.put(`${this.baseUrl}/users/password-reset`, user);

  loginUserApi = (user: IUserSignIn) => axios.post(`${this.baseUrl}/users/login`, user);

  // getUserByIdApi = (id: string) => axios.get(`${this.baseUrl}/users/${id}`);
=======
  // eslint-disable-next-line max-len
  updateUserByIdApi = (id: string, user: IUserUpdate) => axios.put(`${this.baseUrl}/users/${id}`, user);

  deleteUserById = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${this.baseUrl}/users/${id}`);
    }
    catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };
  // eslint-disable-next-line max-len
  // forgetUserPasswordApi = (user: IUserForgetPassword) => axios.put(`${this.baseUrl}/users/password-forget`, user);

  // eslint-disable-next-line max-len
  // resetUserPasswordApi = (user: IUserResetPassword) => axios.put(`${this.baseUrl}/users/password-reset`, user);
  getAllUsersApi = () => axios.get(`${this.baseUrl}/users`);

  loginUserApi = (user: IUserSignIn) => axios.post(`${this.baseUrl}/users/login`, user);

  getUserByIdApi = (id: string) => axios.get(`${this.baseUrl}/users/${id}`);
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
}

export default UserAPIs;
