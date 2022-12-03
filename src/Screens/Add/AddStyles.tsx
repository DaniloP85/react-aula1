import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { ErrorMessage } from "formik";
import Colors from "../../Utils/Common/Colors";

export const MainGrid = styled(Grid)`
  && {
    text-align: center;
  }
`;

export const CustomErrorMessage = styled(ErrorMessage)`
  && {
    font-size: 0.8vw;
    color: ${Colors.Error};
  }
`;

export const CircularProgressDiv = styled.div`
    margin-top: 30px;
`;