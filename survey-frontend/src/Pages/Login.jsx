import React, { use } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    const res=await axios.post("http://localhost:5000/api/auth/login",
    {email,password}
    );
    localStorage.setItem("token",res.data.token);
    navigate("/dashboard");
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <form className="bg-gray-800 p-6 rounded w-80" onSubmit={handleLogin}>
          <h2 className="text-xl mb-4 text-center">Login</h2>
          <input
          type="email"
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 mb-4 bg-gray-700 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 p-2 rounded">Login</button>
        </form>
      </div>
    </>
  );
};
