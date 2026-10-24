import { createContext, useEffect, useState } from "react";
import {
  forgotPasswordApi,
  googleAuthApi,
  loginApi,
  logoutApi,
  registerApi,
  resetPasswordApi,
} from "../services/authService";
import { getMeApi, updateProfileApi } from "../services/userService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setInitialLoading(false);
      return null;
    }
    try {
      const res = await getMeApi();
      if (res.data?.success && res.data?.data) {
        setUser(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        return res.data.data;
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      if (error.response?.status === 401) {
        setUser(null);
        localStorage.removeItem("user");
      }
    } finally {
      setInitialLoading(false);
    }
    return null;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signUp = async (data) => {
    setLoading(true);
    try {
      const res = await registerApi(data);
      return res;
    } catch (error) {
      console.error(error);
      return error.response?.data || { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await loginApi(data);
      if (res.data?.success) {
        const loggedUser = res.data.data?.user;
        setUser(loggedUser);
        if (loggedUser) {
          localStorage.setItem("user", JSON.stringify(loggedUser));
        }
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
      }
      return res;
    } catch (error) {
      console.error(error);
      return error.response?.data || { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = async (data) => {
    setLoading(true);
    try {
      const res = await googleAuthApi(data);
      if (res.data?.success) {
        const loggedUser = res.data.data?.user;
        setUser(loggedUser);
        if (loggedUser) {
          localStorage.setItem("user", JSON.stringify(loggedUser));
        }
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
      }
      return res;
    } catch (error) {
      console.error(error);
      return error.response?.data || { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutApi();
      if (res.data?.success) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      return res;
    } catch (error) {
      console.error(error);
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return error.response?.data || { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    setLoading(true);
    try {
      const res = await updateProfileApi(data);
      if (res.data?.success) {
        const updated = res.data.data;
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
        return { success: true, data: updated, message: res.data.message };
      }
      return res.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return (
        error.response?.data || {
          success: false,
          message: error.message || "Something went wrong",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (email) => {
    setLoading(true);
    try {
      const res = await forgotPasswordApi(email);
      if (res.data?.success) {
        const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
      }
      return res;
    } catch (error) {
      console.error(error);
      return error.response?.data || { success: false, message: error.message };
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
      return error.response?.data || { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initialLoading,
        fetchUser,
        signUp,
        login,
        googleAuth,
        logout,
        updateProfile,
        updateUser: updateProfile,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
