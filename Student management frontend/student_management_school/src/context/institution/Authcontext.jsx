
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export const AuthContext = createContext(); // ✅ Uppercase C

export const AuthProvider = ({ children }) => { // ✅ Uppercase P
  const navigate = useNavigate();

  const [collegeid, setcollegeid] = useState("");
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); // ✅ Keep logged-in user

  const collegelogin = async (username, password) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/superadmin_app/institution_login",
        {
          username,
          password,
        }
      );

      console.log("Login response:", res.data);
      const user = res?.data?.user;
      const token = res?.data?.token;

      if (user?.institution_id && token) {
        // ✅ Save both token and user
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        // setcollegeid(user.institution_id);

        toast.success("Login successful!");
        navigate("admin/dashboard");
      } else {
        toast.error("Login failed: Missing token or institution ID");
      }
    } catch (error) {
      console.error("login failed", error);
      toast.error("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ collegelogin, collegeid, user, token, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};