import React, { useState } from "react";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]  = useState(null)

  const navigate  = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:5000/api/createUser",
      data: {
        name,
        email,
        password,
      },
    }).then(
      (res) => {
        console.log(res);
        if (res.status !==200){
          setErr(res.data.errors[0].message)
        }else{
          navigate('/login')
        }
      },
      (error) => {
        console.log("errorr",error)
      }
    );
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
          Register
        </h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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

        <button className="btn btn-success"> Register </button>
          {<p style={{
            color:'red',
            textAlign:"center"
          }} >{err}</p>}
        <span>
          Do You Have an Account <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;
