import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CommentBox = ({commentsList}) => {
  const [commentText, setCommentText] = useState(null);
  return (
    <Box sx={{display:"flex", gap:2}}>
      <TextField
        fullWidth
        type="text"
        value={commentText}
        onChange={(e) => e.target.value}
      />
      <Button variant="contained" color="primary" sx={{borderRadius:3}} my={1}> Post </Button>
    </Box>
  );
};

export default CommentBox;
