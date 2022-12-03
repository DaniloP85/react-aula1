import { useReducer } from "react";
import UserInfoContext from "./UserInfoContext";
import UserInfoReducer from "./UserInfoReducer";

type Props = {
  children: JSX.Element;
};

const UserInfoContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(UserInfoReducer, {
    userName: "",
    email: "",
  });

  const userInfoValue = {
    userInfo: state,
    changeUserName: (userName: string) => {
      dispatch({
        type: "CHANGE_USER_NAME",
        payload: userName,
      });
    },
    changeEmail: (email: string) => {
      dispatch({
        type: "CHANGE_EMAIL",
        payload: email,
      });
    },
  };

  return (
    <UserInfoContext.Provider value={userInfoValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
export default UserInfoContextProvider;
