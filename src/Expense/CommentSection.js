import React, { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { Box, Typography } from "@mui/material";
import UserAvatarLabel from "../UserAvatarLabel";
import { getFormattedDate } from "../CustomDateFormatter";
import { GoTrash } from "react-icons/go";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { backendService } from "../services/backendServices";
import { useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";

const CommentSection = ({ expenseId, settlementId }) => {
  const [commentList, setCommentList] = useState([]);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [isCommentmodified, setIsCommentmodified] = useState();

  const saveComments = async (commentText) => {

    if (commentText !== null && commentText.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const comment = {
        expenseId: expenseId,
        settlementId: settlementId,
        commentedBy: loggedInUser.userId,
        comment: commentText,
        createDate: today
      }
      try {
        const isSaved = await backendService.postComments(comment);
        if(isSaved)
        {
          //Show Success Snack Bar
          setIsCommentmodified(!isCommentmodified);
        }
        else{
          //Show Error Snack Bar
        }
      }
      catch (err) {
        console.log("Error occurred while saving comments "+err);
      }

    }


  };

  const handleCommentDelete = async (commentId) => {
    try {
      const isCommentDeleted = await backendService.deleteComment(commentId, loggedInUser.userId);
      if (isCommentDeleted) {
        //Show Success Snack Bar
        setIsCommentmodified(!isCommentmodified);
      }
      else {
        //Show Error Snack Bar
      }

    }
    catch (err) {
      //Show Error Snack Bar
      console.log("Error occurred while deleting Comment " + err);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        let comments = [];
        if (expenseId) {
          comments = await backendService.getExpenseComments(expenseId);
        }
        else if (settlementId) {
          comments = await backendService.getSettlementComments(settlementId);
        }
        setCommentList(comments);
      }
      catch (err) {
        console.log("Error occurred while fecthing data");
      }
    }
    getComments();
  }, [expenseId, settlementId,isCommentmodified]);

  return (
    <>
      {commentList && commentList.length > 0 && (
        <Typography
          sx={{
            p: 1,
            mt: 1,
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
            <Typography sx={{ ml: 1 }}>{comment.comment}</Typography>
          </Box>
        ))}
      <CommentBox saveComments={saveComments} />
    </>
  );
};

export default CommentSection;
