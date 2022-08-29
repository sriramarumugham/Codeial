import React, { useState , useEffect } from "react";
import { login as userLogin , register  , editProfile} from "../api";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {setItemInLocalStorage , 
  getItemFromLocalStorage , 
  removeItemFromLocalStorage ,
   getFormBody 
  } from '../utils/index';
  import {LOCALSTORAGE_TOKEN_KEY} from '../utils/constants';
  import jwt_decode from "jwt-decode";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    if (userToken) {
      const user =  jwt_decode(userToken);

      setUser(user);
    }

    setLoading(false);
  }, []);  
 

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY ,  response.data.token ? response.data.token : null);
      setUser(response.data.user);

      return {
        success: true,
      };
    } else {
      console.log(response)
      return {
        success: false,
        message: response.message,
      };
    }
  }
  const logout=()=>{
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      setUser(null);
  }

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      console.log(response)
      return {
        success: true,
      };
    } else {
      console.log(response)
      return {
        success: false,
        message: response.message,
      };
    }
  };

  
  const updateUser = async ( name,email, password , confirmPassword) => {
    const response = await editProfile(name , email, password , confirmPassword);
    if (response.success) {
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY ,  response.data.token ? response.data.token : null);
      setUser(response.data.user);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  }


  return {
      user,
      login,
      logout,
      loading,
      signup,
      updateUser

  };
  
};
