import React, { useContext } from "react";
import UserInfoContext, {
  UserInfoContextType,
} from "../../Store/UserInfo/UserInfoContext";
import { Typography, Stack, Button } from "@mui/material";

const Header = () => {
  const context = useContext<UserInfoContextType>(UserInfoContext);
  return (
    <div>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Typography gutterBottom variant="subtitle2">
          Lista de Colaboradores, {context.userInfo.userName}
        </Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="primary"
          onClick={() => context.changeUserName("Rubens")}
        >
          Change{" "}
        </Button>
      </Stack>
    </div>
  );
};

export default Header;
