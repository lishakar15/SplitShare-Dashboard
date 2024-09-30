import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EastIcon from "@mui/icons-material/East";
import { Box, Divider, Grid, useMediaQuery } from "@mui/material";
import CommentSection from "../Expense/CommentSection";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useTheme } from "@mui/material/styles";
import TimelineIcon from "@mui/icons-material/Timeline";
import PaymentsIcon from "@mui/icons-material/Payments";
import AvatarGenerator from "../AvatarGenerator";
import PaymentDialog from "./PaymentDialog";
import { backendService } from "../services/backendServices";
import { useAtomValue } from "jotai";
import { loggedInUserAtom } from "../atoms/UserAtom";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { Link } from "react-router-dom";

const SettlementList = ({ groupId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);
  const [settlementList, setSettlementList] = useState([]);
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [expanded, setExpanded] = useState(null);

  const handleModifySettlement = (event, selectedSettlementId) => {
    event.stopPropagation();
    setSelectedSettlement(settlementList.find((settlement) => settlement.settlementId === selectedSettlementId));
    setIsOpenExpenseDialog(true);
  };

  const handleSettlementDialogClose = () => {
    setSelectedSettlement(null);
    setIsOpenExpenseDialog(false);
  };

  useEffect(() => {
    const getSettlements = async () => {
      try {
        let settlements = [];
        if (groupId) {
          settlements = await backendService.getSettlements(groupId); //Get Group Settlements
        }
        else {
          settlements = await backendService.getSettlementsByUserId(loggedInUser.userId); //Get User's all Settlements
        }
        if (settlements) {
          setSettlementList(settlements);
        }
      } catch (err) {
        console.log("Error while fetching Settlements " + err);
      }
    };
    getSettlements();
  }, [groupId]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {settlementList ? (
        settlementList.map((settlement, index) => (
          <Accordion key={settlement.settlementId} expanded={expanded === index} onChange={handleChange(index)}>
            <AccordionSummary aria-controls="panel2-content" id="panel2-header">
              <Box
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: isSmallScreen ? "flex-start" : "center",
                  width: "100%",
                  flexDirection: isSmallScreen ? "column" : "row",
                  gap: isSmallScreen ? 2 : "",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PaidOutlinedIcon sx={{ color: "green" }} />
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    Payment from <b>{settlement.paidByUserName}</b> to{" "}
                    <b>{settlement.paidToUserName}</b>
                  </Typography>
                  <KeyboardArrowDownIcon />
                  {!groupId && 
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                    <GroupsOutlinedIcon />
                    <Link style={{ textDecoration: "none" }} to={`/expenses/group/${settlement.groupId}`} onClick={(event)=>event.stopPropagation()}>
                      <Typography sx={{ color: "gray", "&:hover": { textDecoration:"underline" } }}>{settlement.groupName}</Typography>
                    </Link>
                  </Box>
                  }
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <AvatarGenerator
                        userName={settlement.paidByUserName}
                        size={"xs"}
                      />
                      <EastIcon />
                      <AvatarGenerator
                        userName={settlement.paidToUserName}
                        size={"xs"}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <b>{settlement.paidByUserName}</b> paid{" "}
                      <b>{settlement.paidToUserName}</b>
                      <b>₹{settlement.amountPaid.toFixed(2)}</b>
                    </Box>
                  </Box>

                  <PaymentsIcon sx={{ color: "green" }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  ml: 4,
                }}
              >
                <ModeEditOutlineOutlinedIcon
                  onClick={(event) =>
                    handleModifySettlement(event, settlement.settlementId)
                  }
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TimelineIcon />
                    Activities
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {expanded === index && <CommentSection settlementId={settlement.settlementId} />}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>You are all Settled up!!!</Typography>
        </Box>
      )}
      <PaymentDialog
        open={isOpenExpenseDialog}
        onClose={handleSettlementDialogClose}
        settlementReq={selectedSettlement}
        isModReq={true}
      />
    </>
  );
};

export default SettlementList;
