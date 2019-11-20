import React, { useState } from "react";

const CommentForm = ({ articleID, setArticleInfo }) => {
  const [username, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const submitComment = async () => {
    const result = await fetch(`/api/articles/${articleID}/addcomment`, {
      method: "POST",
      body: JSON.stringify({ username, comment: commentText }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await result.json();
    console.log(body)
    setArticleInfo(body);
    setUserName('');
    setCommentText('');
  };
console.log(articleID)
  return (
    <>
      <div className="add-comment-form">
        <h3>Add a Comment</h3>
        <label>
          Name:
          <input
            type="text"
            value={username}
            onChange={event => setUserName(event.target.value)}
          />
        </label>
        <label>
          Comment:
          <textarea
            rows="4"
            cols="50"
            value={commentText}
            onChange={event => setCommentText(event.target.value)}
          />
        </label>

        <button onClick={() => submitComment()}>Add Comment</button>
      </div>
    </>
  );
};
export default CommentForm;
