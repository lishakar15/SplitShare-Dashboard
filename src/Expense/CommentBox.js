import React, { useState, useRef } from "react";
import { TextField, Box, Button } from "@mui/material";

function CommentBox({ saveComments }) {
  const [commentText, setCommentText] = useState(null);

  const handlePostComment = (event) => {
    if (commentText !== "") {
      saveComments(commentText);
      setCommentText("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        py: 0.5,
        backgroundColor: "#fff",
        gap: 1.5,
        mt: 1,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Add your comment..."
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
          },
        }}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handlePostComment}
        sx={{
          textTransform: "none",
          bgcolor: "#e0e7ff",
          color: "#4338ca",
          borderRadius: 2,
        }}
      >
        Post
      </Button>
    </Box>
  );
}

export default CommentBox;