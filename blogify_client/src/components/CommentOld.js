import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Check from "../img/check.png";
import Reply from "../img/reply.png";
import CommentInput from "./CommentInput";

const Comment = ({ postId, userId }) => {
  const [blogComments, setBlogComments] = useState([]);
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [onEditMode, setOnEditMode] = useState(false);
  const [onEditModeId, setOnEditModeId] = useState(null);
  const [state, setState] = useState(true);

  //   console.log(blogComments)

  useEffect(() => {
    const fetchCommentData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/getComments/${postId}`
      );
      setBlogComments(res.data);
    };
    fetchCommentData();
  }, [postId, state]);

  const handleWriteComment = async () => {
    try {
      await axios.post("http://localhost:5000/api/createComment", {
        content: comment,
        blog_id: postId,
        user_id: userId,
      });
      setComment("");
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (id) => {
    console.log(postId, userId, id);
    try {
      await axios.delete("http://localhost:5000/api/deleteComment", {
        data: { blog_id: postId, user_id: userId, id },
      });

      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCommentMode = (id, comment) => {
    try {
      setComment(comment);
      setOnEditMode(true);
      setOnEditModeId(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCommentSuccess = async (item) => {
    console.log(item);
    try {
      await axios.put("http://localhost:5000/api/updateComment", {
        content: comment,
        id: item.id,
        blog_id: item.blog_id,
        user_id: item.user_id,
      });
      setOnEditMode(false);
      setOnEditModeId(null);
      setComment("");
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyComment = (item) => {
    console.log(item);
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          className="form-control"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <div
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => handleWriteComment()}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Comment
        </div>
      </div>
      <h2>Comments</h2>
      {blogComments?.map((item) => (
        <div className="comment_container" key={item.id}>
          {onEditModeId == item.id && onEditMode == true ? (
            <div>
              <input
                type="text"
                className="form-control"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>
          ) : (
            <div>
              <div>{item.content}</div>
              <div >
                <img
                  onClick={() => handleReplyComment(item)}
                  src={Reply}
                  alt="Reply"
                  style={{height:16,width:16}}
                />
              </div>
            </div>
          )}

          {currentUser.id === item.user_id && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="edit"
            >
              <div>
                {onEditModeId == item.id && onEditMode == true ? (
                  <img
                    src={Check}
                    alt="check"
                    onClick={() => handleUpdateCommentSuccess(item)}
                  />
                ) : (
                  <img
                    src={Edit}
                    alt="Edit"
                    onClick={() =>
                      handleUpdateCommentMode(item.id, item.content)
                    }
                  />
                )}
              </div>

              <div>
                <img
                  onClick={() => handleDeleteComment(item.id)}
                  src={Delete}
                  alt="Delete"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
