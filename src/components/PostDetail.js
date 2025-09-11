import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const containerStyle = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  };

  const titleStyle = {
    marginTop: "0",
    color: "#222"
  };

  const metaStyle = {
    fontSize: "0.9rem",
    color: "#999",
    marginBottom: "20px"
  };

  const contentStyle = {
    lineHeight: "1.6",
    color: "#555"
  };

  if (!post) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{post.title}</h1>
      <p style={metaStyle}>
        By {post.author || "Admin"} on on {new Date(post.createdAt).toLocaleDateString()}

      </p>
      <p style={contentStyle}>{post.content}</p>
    </div>
  );
};

export default PostDetail;
