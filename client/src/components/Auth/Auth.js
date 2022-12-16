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
import Notify from "../Notify/notify";
import { invalid } from "moment";

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
  const [notify,setNotify]=useState(false);
  const [userError,setUserError]=useState(false);


  const isLanguageEnglish = useSelector((state) => state.language.isEnglish);

  // const Eng="The username/password provided is incorrect";
  // const Vie="Tên đăng nhập hoặc mật khẩu sai";

  const TextSignIn={'Eng':"The username/password provided is incorrect!", 'Vie':"Tên đăng nhập hoặc mật khẩu sai!"}
  const TextSignUp={'Eng':"Sign up successfully!", 'Vie':"Đăng kí thành công!"}


  const handleNotify=(notify)=>{
    setNotify(!notify)
  }

  const handleuserError=(a)=>{
    console.log(a);
    setUserError(a)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(register(formData, history,handleNotify,handleuserError))
    } else {
      dispatch(login(formData, history,handleNotify,handleuserError))
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(notify===true)
    {
      setNotify(!notify);
    }
  };

  

  
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  

  return (
<div style={{width:"100vw",background:"linear-gradient(120deg, #3ca7ee, #9b408f)",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>

<Container component="main" maxWidth="xs" >
  {(notify)?<Notify isLan={isLanguageEnglish} text={isSignup?TextSignUp:TextSignIn} isClose={handleNotify}/>:<></>}
      <Paper className={classes.paper} elevation={3} style={{background:"linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%) "}}>
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
              invalid={userError&&notify&&!isSignup}
              name="userName"
              label="User Name"
              handleChange={handleChange}
            />
            <Input
              invalid={notify&&!isSignup}
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {(notify&&! isSignup)?<span style={{color:"red",marginLeft:"8px"}}>{
            (userError?(isLanguageEnglish?"Account does not exist!":"Tài khoảng không tồn tại!"):
            (isLanguageEnglish?"Wrong password!":"Mật khẩu bạn nhập bị sai"))}
            </span>:<span>{""}</span>}
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
          <Grid container justifyContent="flex-end">
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
    </div>
    
  )
}

export default Auth;
