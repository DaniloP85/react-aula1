import React, { useState } from "react";
import { Context, createContext } from "react";
import { IUserInfo } from "../../Interfaces/IUserInfo";

export type ActionProps = {
  type: string;
  payload: any;
};

export type UserInfoContextType = {
  userInfo: IUserInfo;
  changeUserName: (userName: string) => void;
  changeEmail: (email: string) => void;
};

const UserInfoContext: Context<UserInfoContextType> =
  createContext<UserInfoContextType>({
    userInfo: {
      userName: "",
      email: "",
    },
    changeUserName: (userName: string) => {},
    changeEmail: (email: string) => {},
  });

export default UserInfoContext;