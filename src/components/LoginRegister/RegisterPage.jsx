import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context";
import { registerUser } from "../../fake-api";

import LogoBlack from "../../assets/gpt_black_logo.svg";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = () => {
    if (email.trim() && password.trim()) {
      const user = registerUser({ email, password });
      login(user);
      navigate("/");
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <>
    <div className="container mx-auto sm:w-[500px] px-8">

    <div className="bg-slate-100 p-5 rounded-lg w-1/4">
      <img className="sm:w-[90px] w-[70px] p-3 sm:p-5 mx-auto" src={LogoBlack} alt="logo" />
      <h1 className="text-center text-lg sm:text-4xl p-3 sm:p-5 font-semibold">Register</h1>
      <div className="grid gap-y-5">
        <input className="rounded-lg outline-none p-2 sm:p-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="rounded-lg outline-none p-2 sm:p-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full p-2 sm:p-4 bg-[#10A37F] hover:bg-[#2c8871] rounded-lg text-white font-medium" onClick={handleRegister}>Register</button>
      </div>
      <p className="p-2 sm:pt-4">
        Already have an account? <Link className="font-medium text-blue-800" to="/auth/login">Login here</Link>
      </p>
    </div>
    </div>
          </>
  );
};

export default RegisterPage;
