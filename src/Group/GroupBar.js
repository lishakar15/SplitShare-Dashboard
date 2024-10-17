import { Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import CreateGroupDialog from "../CreateGroupDialog";

const GroupBar = ({}) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Card sx={{ my: 2, border: "1px solid #e5e7eb" }}>
        <CardContent
          sx={{
            mx: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "black" }}>
            Groups
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              textTransform: "none",
              bgcolor: "#4338ca",
              ml: 2,
            }}
          >
            + New Group
          </Button>
        </CardContent>
      </Card>
      {open && <CreateGroupDialog open={open} onClose={handleClose} />}
    </>
  );
};

export default GroupBar;
