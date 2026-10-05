import { createContext, useState } from "react";
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  registerApi,
  resetPasswordApi,
} from "../services/authService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (data) => {
    setLoading(true);
    try {
      const res = await registerApi(data);
      if (res.data.success) return res;
    } catch (error) {
      console.error(error);
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await loginApi(data);
      if (res.data.success) {
        setUser(res.data.data.user);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
      }
      return res;
    } catch (error) {
      console.error(error);
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutApi();
      if (res.data.success) {
        setUser(null);
        localStorage.removeItem("accessToken", "refreshToken");
      }
      return res;
    } catch (error) {
      console.error(error);
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };
  const forgetPassword = async (email) => {
    setLoading(true);
    try {
      const res = await forgotPasswordApi(email);
      if (res.data.success) {
        const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
      }
      return res;
    } catch (error) {
      console.error(error);
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async (token, password) => {
    setLoading(true);
    try {
      const res = await resetPasswordApi(token, password);
      return res;
    } catch (error) {
      console.error(error);
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        login,
        logout,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
