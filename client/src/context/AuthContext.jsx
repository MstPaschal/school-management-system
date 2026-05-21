import {

  createContext,

  useContext,

  useState

} from "react";

import api from "../services/api";


const AuthContext =
  createContext();



export const AuthProvider =
  ({ children }) => {

    const [user, setUser] =
      useState(

        JSON.parse(
          localStorage.getItem("user")
        ) || null

      );


    const login =
  async (username, password) => {

    try {

      const res =
        await api.post(
          "api/auth/login",
          {
            username,
            password
          }
        );

      console.log(res.data);


      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );


      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );


      setUser(res.data.user);

      return {

        success: true,

        user: res.data.user

      };

    } catch (error) {

      return {

        success: false,

        message:
          error.response?.data?.message
          || "Login failed"

      };

    }

  };


    const logout = () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      setUser(null);

    };


    return (

      <AuthContext.Provider
        value={{
          user,
          login,
          logout
        }}
      >

        {children}

      </AuthContext.Provider>

    );

  };



export const useAuth = () =>
  useContext(AuthContext);