import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = ({ foodId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/comments/${foodId}`, { withCredentials: true })
      .then(res => setComments(res.data.comments));
  }, [foodId]);

  const addComment = async () => {
    if (!text.trim()) return;

    const res = await axios.post(
      "http://localhost:3000/api/comments",
      { foodId, text },
      { withCredentials: true }
    );

    setComments([res.data.comment, ...comments]);
    setText('');
  };

  return (
    <div className="comment-modal">
      <button onClick={onClose}>Close</button>

      <div className="comment-list">
        {comments.map(c => (
          <div key={c._id}>
            <strong>{c.user.fullName}</strong>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={addComment}>Post</button>
    </div>
  );
};

export default Comments;
