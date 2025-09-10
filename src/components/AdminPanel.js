import React, { useState, useEffect } from 'react';
import API from '../api';

function AdminPanel() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });

  const fetchPosts = () => {
    API.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/posts', newPost)
      .then(res => {
        setNewPost({ title: '', content: '', author: '' });
        fetchPosts();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleChange}
          placeholder="Content"
          required
          style={{ display: "block", margin: "10px 0" }}
        />
        <input
          name="author"
          value={newPost.author}
          onChange={handleChange}
          placeholder="Author"
          style={{ display: "block", margin: "10px 0" }}
        />
        <button type="submit">Add Post</button>
      </form>

      <h3>Existing Posts</h3>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
