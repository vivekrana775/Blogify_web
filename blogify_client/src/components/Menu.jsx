import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Menu = () => {
  const {posts} = useContext(AuthContext)

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.slice(0,4).map((post, index) => (
        <div className="post" key={post.id}>
          <div className="Menu_blog_image" >
            <img style={{objectFit:"cover"}}  src={`../${post.img}`} alt={post.title} />
          </div>
          <h2>{post.title}</h2>
          <Link className="btn btn-dark" to={`/blog/${post.id}`}>
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
