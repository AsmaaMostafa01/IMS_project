/* eslint-disable no-unused-vars */

<<<<<<< HEAD
import { IMetaData } from "./base.type";
=======
import { IMetaData } from './base.type';
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c

// These classes are User DOTs

// eslint-disable-next-line no-shadow
enum UserTypeEnum {
    SADMIN = 'sAdmin',
    ADMIN = 'admin',
<<<<<<< HEAD
=======
    TEAMLEADER='TeamLeader',
    TRAINEE='Trainee'
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
}

type IUserBase = {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    type: UserTypeEnum,
}

type IDefaultUserAttributes = {
    passwordStatus: string,
}

// Other: orgId, password

interface IUserRef extends IUserBase, IDefaultUserAttributes, IMetaData{
    createdBy: string,
}

interface IUserCreate extends IUserBase{
    orgId?: string,
    clientId?: string,
<<<<<<< HEAD
    password: string,
    picture: string,
=======
    password?: string,
    picture?: string,
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
}

interface IUserSignIn {
    email: string,
    password: string,
}

interface IUserUpdate extends IUserBase, IDefaultUserAttributes{
<<<<<<< HEAD
    updatedAt: Date,
=======
    id: string;
  // username: string;
  email: string;
  type: UserTypeEnum;
  firstName: string;
  lastName: string;
  mobile: string;
  password?: string; // Optional if you're not always updating the password
  updatedAt: Date;
>>>>>>> 7837fcc238be675b0eae11776801ea2e4c180f5c
}

interface IUserPasswordUpdate{
    password: string,
}

interface IUserForgetPassword{
    email: string,
}

interface IUserResetPassword{
    resetToken: string,
    password: string,
}

interface IUser extends IUserBase, IDefaultUserAttributes, IMetaData{
    picture: string,
    createdBy: IUserRef,
}

interface IUserDB extends IUserBase, IDefaultUserAttributes, IMetaData{
    password: string,
    createdBy: string,
}

export type {
  IUserCreate,
  IUserSignIn,
  IUserUpdate,
  IUserPasswordUpdate,
  IUserForgetPassword,
  IUserResetPassword,
  IUser,
  IUserRef,
  IUserDB,
};

export {
  UserTypeEnum,
};
