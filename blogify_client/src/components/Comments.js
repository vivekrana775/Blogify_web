import React, { useState, useEffect,useMemo } from "react";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import axios from "axios";

const Comments = ({ post_id, user_id,comments }) => {
  const [state, setState] = useState(true);
  const [blogComments, setBlogComments] = useState([]);

  const commentByParentId = useMemo(()=>{
    // if (comments==null )return []
    const group = {}
    blogComments.forEach(comment=>{
      group[comment.parent_id] ||= []
      group[comment.parent_id].push(comment)
    })
    return group 

  },[blogComments])

  

  function getReplies(parent_id){
    return commentByParentId[parent_id]
  }

  useEffect(() => {
    const fetchCommentData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/getComments/${post_id}`
      );
      setBlogComments(res.data);
    };
    fetchCommentData();
  }, [post_id, state]);

  return (
    <div>
      

      {comments?.map((item) => (
        <Comment
          comment={item}
          key={item.id}
          post_id={post_id}
          user_id={user_id}
          state={state}
          setState={setState}
          getReplies={getReplies}
          
        />
      ))}
    </div>
  );
};

export default Comments;
