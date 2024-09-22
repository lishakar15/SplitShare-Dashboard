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
import { SETTLEMENT_DATA } from "../data/SettlementData";
import AvatarGenerator from "../AvatarGenerator";
import PaymentDialog from "./PaymentDialog";

const SettlementList = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [isOpenExpenseDialog, setIsOpenExpenseDialog] = useState(false);

  const handleModifySettlement = (selectedSettlementId) => {
    setSelectedSettlement(SETTLEMENT_DATA.find((settlement) => settlement.settlementId === selectedSettlementId));
    setIsOpenExpenseDialog(true);
  };

  const handleSettlementDialogClose = () => {
    setSelectedSettlement(null);
    setIsOpenExpenseDialog(false);
  };
 
  return (
    <>
      {SETTLEMENT_DATA ? (
        SETTLEMENT_DATA.map((settlement) => (
          <Accordion>
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
                  onClick={() =>
                    handleModifySettlement(settlement.settlementId)
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
                  <CommentSection settlementId={settlement.settlementId} />
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
            alignItems: "ceneter",
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
