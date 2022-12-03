import { TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Colors from "../../Utils/Common/Colors";

const RedditTextField = styled((props: any) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    color: Colors.SecondaryMedium,
    border: "1px solid " + Colors.SecondaryLight,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#f3f3f3",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: Colors.SecondaryDark,
      color: Colors.SecondaryMedium,
    },
  },
  "& .MuiInputLabel-root": {
    color: Colors.SecondaryMedium,
    "&.Mui-focused": {
      color: Colors.SecondaryMedium,
    },
  },
}));

type IProps = {
  label: string;
  defaultValue?: string;
  onChange?: Function;
  type?: string;
};
const CustomTextField = ({ label, defaultValue, onChange, type }: IProps) => {
  return (
    <RedditTextField
      label={label}
      defaultValue={defaultValue}
      variant="filled"
      style={{ marginTop: 11 }}
      onChange={onChange}
      type={type}
    />
  );
};

export default CustomTextField;
