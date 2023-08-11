import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginForm = () => {
  const navigate  = useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState(null)
  const {login} = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email,password,setErr,navigate)
   
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "teal",
          }}
        >
          Login
        </h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            required
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            required
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success"> Login </button>
        <p style={{
            color:'red',
            textAlign:"center"
          }} >{err}</p>
        <span>
          Don't you have an account? <Link to="/signin">Register</Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
