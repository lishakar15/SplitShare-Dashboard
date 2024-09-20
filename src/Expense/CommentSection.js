import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { Box, Typography } from "@mui/material";
import { COMMENTS_DATA } from "../data/CommentData";
import UserAvatarLabel from "../UserAvatarLabel";
import { getFormattedDate } from "../CustomDateFormatter";
import { GoTrash } from "react-icons/go";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";

const CommentSection = ({ expenseId, settlementId }) => {
  const [commentList, setCommentList] = useState(null);
  const saveComments = (comment) => {
    if (expenseId) {
      //Call to API to save comments in Expense
    } else if (settlementId) {
      //Call to API to save comments in Settlement
    }
    //Save comment into database
  };
  const handleCommentDelete = (commentId) => {
    //Make API call to delete the commentId
  };
  useEffect(() => {
    if (expenseId) {
      setCommentList(
        COMMENTS_DATA.filter((comment) => comment.expenseId === expenseId)
      );
    } else if (settlementId) {
      setCommentList(
        COMMENTS_DATA.filter((comment) => comment.settlementId === settlementId)
      );
    }
  }, []);

  return (
    <>
      {commentList && commentList.length > 0 && (
        <Typography
          sx={{
            p: 1,
            mt:1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
          }}
        >
          <SmsOutlinedIcon /> Comments
        </Typography>
      )}
      {commentList &&
        commentList.map((comment) => (
          <Box
            sx={{
              p: 1,
              border: "1px solid lightgray",
              borderRadius: 1,
              bgcolor: "#f9fafb",
              my: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
                mr: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <UserAvatarLabel userName={comment.userName} />
                <Typography>{getFormattedDate(comment.createDate)}</Typography>
              </Box>
              <GoTrash
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                }}
                onClick={() => handleCommentDelete(comment.commentId)}
              />
            </Box>
            <Typography sx={{ml:1}}>{comment.comment}</Typography>
          </Box>
        ))}
      <CommentBox saveComments={saveComments} />
    </>
  );
};

export default CommentSection;
