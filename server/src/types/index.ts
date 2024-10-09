
import {
  IUserCreate, IUserUpdate, IUserPasswordUpdate, IUserForgetPassword,
  IUserResetPassword, IUserSignIn,
  UserTypeEnum, UserLevelEnum,
} from './user.type';
import IError, { HttpStatus } from './error.type';
import { IStatusUpdate, StatusEnum } from './base.type';
<<<<<<< HEAD
// import {IProgramCreate, IProgramUpdate} from "./program.type";
=======
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c

export type {
  IUserCreate, IUserUpdate, IUserPasswordUpdate, IUserForgetPassword,
  IUserResetPassword, IUserSignIn,
  IError, IStatusUpdate
};

export {
  UserTypeEnum, UserLevelEnum,
  HttpStatus, StatusEnum
};
