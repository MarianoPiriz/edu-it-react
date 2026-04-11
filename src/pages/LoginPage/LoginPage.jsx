import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUserRegistration = () => {
    if (!formData.username || !formData.password) {
      setMessage("Please fill in all fields");
      return;
    }
    const result = register(formData);
    setMessage(result.message);
  }
    const handleUserLogin = () => {
      const userDB = JSON.parse(localStorage.getItem("userDB")) || [];
      const existingUser = userDB.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password,
      );
      if (existingUser) {
        login(existingUser);
        navigate("/");
      } else {
        setMessage("Invalid username or password");
      }
    };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col justify-center w-80 h-min border p-8 rounded-lg shadow-md bg-white">
        {message && <p className="text-red-500 text-xs mb-4 text-center">{message}</p>}
        <input
          className="bg-transparent border-b border-gray-300 focus:outline-none text-gray-500 text-sm"
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleFormChange}
        />
        <input
          className="bg-transparent border-b border-gray-300 focus:outline-none text-gray-500 text-sm mt-4"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
        />
        <div className="flex gap-2 mt-4 font-sans text-xs w-full">
          <button
            className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex-1"
            onClick={handleUserLogin}
          >
            Login
          </button>
          <button
            className=" bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex-1"
            onClick={handleUserRegistration}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
