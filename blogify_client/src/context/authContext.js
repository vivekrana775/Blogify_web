import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [posts , setPosts] = useState([])
  
  const [privatePosts,setPrivatePosts] = useState([])
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  const login = (email, password, setErr, navigate) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/login",
      data: {
        email,
        password,
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          setCurrentUser(res.data);
          navigate("/");
        } else {
          setErr(res.data);
        }
      },
      (error) => {
        console.log("errorr", error);
      }
    );
  };

  const logout =  () => {
    axios({
      method:"post",
      url:"http://localhost:5000/api/logout",
      
    }).then((res)=>{
      console.log(res)
      console.log(res)
    },(error)=>{
      console.log("errorr",error)
    })
    setCurrentUser(null);
    
  };

  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    
    // TO get All the Blogs
    const getPosts=async()=>{
      const res = await axios.get("http://localhost:5000/api/getAllBlogs")
      setPosts(res.data)
    }
    getPosts()

  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, posts }}>
      {children}
    </AuthContext.Provider>
  );
};
