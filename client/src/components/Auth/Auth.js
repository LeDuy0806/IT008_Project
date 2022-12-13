import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import { login, register } from "../../actions/auth";

const initialState = {
  userType: "",
  firstName: "",
  lastName: "",
  userName: "",
  mail: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();

  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(register(formData, history))
    } else {
      const login_data = login(formData, history)
      console.log(login_data)
      dispatch(login(formData, history))
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  return (
    <Container component="main" maxWidth="xs" >
      <Paper className={classes.paper} elevation={3} style={{background:"linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)"}}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup
            ? isLanguageEnglish
              ? "Sign up"
              : "Đăng kí"
            : isLanguageEnglish
            ? "Sign in"
            : "Đăng nhập"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="userType"
                  label="User type"
                  handleChange={handleChange}
                />
                <Input
                  name="mail"
                  label="Email address"
                  handleChange={handleChange}
                  type="email"
                />
              </>
            )}

            <Input
              name="userName"
              label="User Name"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup
              ? isLanguageEnglish
                ? "Sign up"
                : "Đăng kí"
              : isLanguageEnglish
              ? "Sign in"
              : "Đăng nhập"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? isLanguageEnglish
                    ? "Already have an account? Sign in"
                    : "Bạn đã có tài khoản? Đăng nhập"
                  : isLanguageEnglish
                  ? "Don't have an account? Sign Up"
                  : "Bạn đã có tài khoản? Đăng kí"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;
