import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/getAllBlogs",
    }).then((res) => {
      setBlogs(res.data);
    },(err)=>{
      console.log(err)
  });
  }, []);

  return <div>
    {
      blogs?.map((item)=>{
        return <div key={item.id} >
          <div>{item.title}</div>
          <div>{item.content}</div>
        </div>
      })
    }
  </div>;
};

export default PublicBlogs;
