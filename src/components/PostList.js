import React, { useEffect, useState } from "react";
import API from "../api";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        // Sort posts by date (latest first)
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sorted);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const containerStyle = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px"
  };

  const cardStyle = {
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  };

  const titleStyle = { fontSize: "1.5rem", marginBottom: "10px" };
  const contentStyle = { fontSize: "1rem", marginBottom: "10px" };
  const metaStyle = { fontSize: "0.85rem", color: "#555" };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Tech Blog</h1>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No posts yet!</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={cardStyle}>
            <h2 style={titleStyle}>{post.title}</h2>
            <p style={contentStyle}>{post.content}</p>
            <p style={metaStyle}>
              By <strong>{post.author}</strong> |{" "}
              {new Date(post.date).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
