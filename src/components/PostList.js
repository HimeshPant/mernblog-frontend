import React, { useEffect, useState } from 'react';
import API from './api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Dummy posts shown at the top
  const dummyPosts = [
    {
      _id: 'dummy1',
      title: 'Welcome to the Tech Blog!', 
      content: 'Explore various tech articles, tutorials, and tips to boost your skills.',
      author: 'Recruiter',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'dummy2',
      title: 'I am Himesh Pant',
      content: 'I built this project to showcase my skills in React, Node.js, and deploying full-stack applications.',
      author: 'Recruiter',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'dummy3',
      title: 'How I Made This Blog',
      content: 'This simple tech blog is built using React for the frontend and Node.js with MongoDB for the backend. It’s deployed on Render and Vercel.',
      author: 'Recruiter',
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    API.get("/posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.error("API error:", err);
      });
  }, []);

  // Card styling
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    margin: '15px 0',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  };

  const cardHover = {
    transform: 'scale(1.02)'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Tech Blog</h1>

      {/* Dummy Posts Section */}
      <h2 style={{ marginTop: '40px', color: '#555' }}>Recommended Posts</h2>
      {dummyPosts.map(post => (
        <div
          key={post._id}
          style={cardStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, cardHover)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'scale(1)' })}
        >
          <h3 style={{ marginBottom: '10px', color: '#222' }}>{post.title}</h3>
          <p style={{ color: '#555', lineHeight: '1.5' }}>{post.content}</p>
          <small style={{ display: 'block', marginTop: '15px', color: '#888' }}>
            Author: {post.author} | {new Date(post.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}

      {/* Real Posts Section */}
      <h2 style={{ marginTop: '40px', color: '#555' }}>Latest Posts</h2>
      {posts.map(post => (
        <div
          key={post._id}
          style={cardStyle}
          onMouseEnter={e => Object.assign(e.currentTarget.style, cardHover)}
          onMouseLeave={e => Object.assign(e.currentTarget.style, { transform: 'scale(1)' })}
        >
          <h3 style={{ marginBottom: '10px', color: '#222' }}>{post.title}</h3>
          <p style={{ color: '#555', lineHeight: '1.5' }}>{post.content}</p>
          <small style={{ display: 'block', marginTop: '15px', color: '#888' }}>
            Author: {post.author} | {new Date(post.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default PostList;