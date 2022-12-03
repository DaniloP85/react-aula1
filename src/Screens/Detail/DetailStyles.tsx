import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const MainStack = styled(Stack)`
  && {
    margin-top: 150px;
    text-align: center;
    width: 100%;
    align-items: center;
  }
`;
export const TitlePage = styled(Typography)`
  && {
    font-size: 28px;
  }
`;

export const ButtonMaxSize = styled(Button)`
  && {
    max-width: 200px;
  }
`;