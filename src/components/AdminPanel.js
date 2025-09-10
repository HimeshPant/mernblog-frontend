import React, { useState } from "react";
import API from "../api";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const containerStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem"
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and Content are required");
      return;
    }

    const newPost = {
      title,
      content,
      author: author || "Admin",
      date: new Date() // ensures correct date
    };

    try {
      const res = await API.post("/posts", newPost);
      alert("Post created successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          style={{ ...inputStyle, height: "150px" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          style={inputStyle}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit" style={buttonStyle}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
