import React from "react";
import { Link } from "react-router-dom";

const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };


const BlogList = ({posts}) => {
  return (
    <div className="home">
      <div className="posts">
        {posts?.map((post) => (
          <div className="post" key={post.id}>
            <div style={{width:400,height:400}} className="img">
              <img src={`../${post.img}`} alt={post.title} />
            </div>
            <div className="content">
              <Link className="link" to={`/blog/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.content.slice(0, 200))}</p>
              <Link to={`/blog/${post.id}`}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
