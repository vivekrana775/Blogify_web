import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

import Menu from "../components/Menu";
import CommentInput from "../components/CommentInput";
import Comments from "../components/Comments";

const BlogView = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [blogComments, setBlogComments] = useState([]);
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/getBlog/${postId}`
        );
        setPost(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogData();
    const fetchCommentData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/getComments/${postId}`
      );
      setBlogComments(res.data);
    };
    fetchCommentData();

  }, [postId]);

 
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteBlog/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const rootComments = blogComments.filter((item)=>item.parent_id===null)

  return (
    <div className="single">
      <div className="content">
        <div className="blog_image">
          <img src={`../${post.img}`} alt={post.title} />
        </div>
        <div className="user">
          {post.img && <img src={`../${post.img}`} alt="image" />}
          <div className="info">
            <span>{post.category}</span>
            <p>Posted {moment(post.createdAt).fromNow()}</p>
          </div>
          {currentUser.id === post.user_id && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="edit"
            >
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="Edit" />
              </Link>
              <div>
                <img onClick={handleDelete} src={Delete} alt="Delete" />
              </div>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>
        <CommentInput
        post_id={postId}
        user_id={currentUser.id}
      />
      <h2>Comments</h2>
        <Comments comments = {rootComments} post_id={postId} user_id={currentUser.id}/>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default BlogView;
