import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  handleOnClick: () => void;
  title: string;
  style: React.CSSProperties;
  variant: "text" | "outlined" | "contained";
  disabled: boolean;
}

const Button = (props: ButtonProps) => {
  const { handleOnClick, title, style, variant } = props;

  return (
    <MUIButton variant={variant} onClick={() => handleOnClick()} style={style}>
      {title}
    </MUIButton>
  );
};
Button.defaultProps = {
  style: {},
  variant: "text",
  disabled: false,
  title: "",
};
export default Button;
