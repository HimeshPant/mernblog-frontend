import React, { useState, useEffect } from "react";
import API from "../api";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    API.get("/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      author: author || "Admin",
      date: new Date()
    };

    API.post("/posts", newPost)
      .then(res => {
        console.log("Post added", res.data);
        setTitle("");
        setContent("");
        setAuthor("");
        fetchPosts(); // Refresh list after adding
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    API.delete(`/posts/${id}`)
      .then(res => {
        console.log("Post deleted", res.data);
        fetchPosts(); // Refresh list after deleting
      })
      .catch(err => console.error(err));
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "#f4f4f4",
    borderRadius: "10px"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px"
  };

  const deleteButtonStyle = {
    padding: "5px 10px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: "center" }}>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={inputStyle}
          rows="6"
          required
        />
        <input
          type="text"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Post</button>
      </form>

      <h3>Existing Posts</h3>
      {posts.map(post => (
        <div key={post._id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <small>By: {post.author} on {new Date(post.date).toLocaleString()}</small>
          <br />
          <button style={deleteButtonStyle} onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
