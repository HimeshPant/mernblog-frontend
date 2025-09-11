import React, { useState, useEffect } from "react";
import API from '../api';
 // Your axios instance

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Dummy posts at the top
  const dummyPosts = [
    {
      _id: "dummy1",
      title: "I am Himesh Pant",
      content: "This is a demo post explaining how I built this blog.",
      author: "Himesh Pant",
      date: new Date().toISOString()
    },
    {
      _id: "dummy2",
      title: "Getting Started",
      content: "Here’s a step-by-step guide to starting with React and Node.",
      author: "Tech Guru",
      date: new Date().toISOString()
    },
    {
      _id: "dummy3",
      title: "UI Tips",
      content: "Learn how to make visually appealing interfaces with CSS.",
      author: "UI Expert",
      date: new Date().toISOString()
    }
  ];

  // Fetch posts from backend
  const fetchPosts = () => {
    API.get("/posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error("Failed to fetch posts:", err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openPost = (id) => {
    window.location.href = `/posts/${id}`; // Opens in new page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Featured Posts</h2>
      <div style={styles.postGrid}>
        {dummyPosts.map(post => (
          <div key={post._id} style={styles.postCard} onClick={() => openPost(post._id)}>
            <h3 style={styles.title}>{post.title}</h3>
            <p style={styles.content}>{post.content}</p>
            <small style={styles.author}>By {post.author}</small>
          </div>
        ))}
      </div>

      <h2 style={styles.heading}>Latest Posts</h2>
      <div style={styles.postGrid}>
        {posts.map(post => (
          <div key={post._id} style={styles.postCard} onClick={() => openPost(post._id)}>
            <h3 style={styles.title}>{post.title}</h3>
            <p style={styles.content}>{post.content}</p>
            <small style={styles.author}>By {post.author}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "0 20px"
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px"
  },
  postGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },
  postCard: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    backgroundColor: "#fff",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  title: {
    fontSize: "18px",
    color: "#222",
    marginBottom: "10px"
  },
  content: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px"
  },
  author: {
    fontSize: "12px",
    color: "#888"
  }
};

export default PostList;
