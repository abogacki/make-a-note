import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/Visibility";

import { ChangeEventHandler, FunctionComponent, useState } from "react";

type TProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  fullWidth?: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

const PasswordInput: FunctionComponent<TProps> = ({
  id,
  value,
  label,
  name,
  onChange,
  fullWidth = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((state) => !state);
  return (
    <FormControl fullWidth={fullWidth} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        name={name}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={label.length * 10}
        fullWidth={fullWidth}
      />
    </FormControl>
  );
};

export default PasswordInput;
