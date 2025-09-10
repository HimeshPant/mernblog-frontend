import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><em>By {post.author} on {new Date(post.date).toLocaleDateString()}</em></p>
    </div>
  );
}

export default PostDetail;
