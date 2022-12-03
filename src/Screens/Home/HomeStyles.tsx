import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Colors from "../../Utils/Common/Colors";

export const Main = styled.div`
  margin-top: 180px;
`;

export const Title = styled(Typography)`
  && {
    text-align: center;
    line-height: 60px;
  }
`;

export const CustomLink = styled.div`
    text-align: center;
    font-size: 16vm;
    color: ${Colors.PrimaryMedium};
    cursor: pointer;
`;

type CustomBoxType = {
  color: string;
};
const Box2 = styled(Main)`
  && {
    text-align: center;
    width: 200px;
    height: 60px;
    background-color: ${(props: CustomBoxType) => props.color || "blue"};
  }
`;

export const CustomBox = ({ color }: CustomBoxType) => {
  return <Box2 color={color} />;
};
export const TableHeaderStyle = {
  backgroundColor: "#eee",
  color: Colors.PrimaryDark,
};

export const TableRowStyle = {
  color: Colors.PrimaryMedium,
};

export const TableSearchFieldStyle = {
  color: Colors.PrimaryDark,
  borderBottom: "2px solid #eee",
};