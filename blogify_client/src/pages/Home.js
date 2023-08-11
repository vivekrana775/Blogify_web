import React from "react";
import { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import BlogList from "../components/BlogList";
import { AuthContext } from "../context/authContext";

const Home = () => {
  let { posts } = useContext(AuthContext);

  return (
    <>
      <BlogList posts={posts} />
    </>
  );
};

export default Home;
