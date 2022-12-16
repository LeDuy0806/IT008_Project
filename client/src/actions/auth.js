import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

export const login = (formData, history,handleNotify,handleuserError) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    if(data === "Not allowed"||data==="Cannot find user")
    {
      //alert("sai mat khau r te")
      // console.log(data);

      // console.log(data);
      // handleNotify();    
      if(data==="Cannot find user")
      {
        handleNotify();  
        handleuserError(true);
      }

      if(data==="Not allowed")
      {     
        handleNotify(); 
        handleuserError(false);
      }
    }
    else
    {
      dispatch({ type: AUTH, data });
      history.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData, history,handleNotify) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
    handleNotify();
    history.push("/Auth");
    
  } catch (error) {
    console.log(error);
  }
};
