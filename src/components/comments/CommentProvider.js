import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);

  const getCommentsByPostId = (post_id) => {
    return fetch(`http://localhost:8088/comments?post_id=${post_id}`)
      .then((res) => res.json())
      .then(setComments);
  };

  const createComment = (newComment) => {
    return fetch(`http://localhost:8088/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    }).then(() => {
      getCommentsByPostId(newComment.post_id);
    });
  };

  // delete the comment with the given id, then fetch comments for given post id and update state
  const deleteComment = (comment_id, post_id) => {
    return fetch(`http://localhost:8088/comments/${comment_id}`, {
      method: "DELETE",
    }).then(() => getCommentsByPostId(post_id));
  };
  return (
    <CommentContext.Provider
      value={{ comments, getCommentsByPostId, createComment, deleteComment }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
