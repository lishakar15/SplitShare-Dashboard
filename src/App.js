import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Activity from "./Activity";
import Friends from "./Friends";
import Groups from "./Group/Groups";
import Expense from "./Expense/Expenses";
import SideNavBar from "./SideNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useMediaQuery } from "@mui/material";
import SearchBar from "./SearchBar";
import { isUserLoggedInAtom } from "./atoms/UserAtom";
import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";
import { useAtomValue } from "jotai";
import FriendsNavBar from "./FriendsNavBar";
import GroupNavBar from "./GroupNavBar";

function App() {
  const isSmallScreen = useMediaQuery("(max-width:1200px)");
  const isUserLoggedIn = useAtomValue(isUserLoggedInAtom);

  return (
    <>
      {!isUserLoggedIn ? (
        <Routes>
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="*" element={<LoginUser />} />
        </Routes>
      ) : (
        <Box sx={{ m: 1, maxHeight: "100vh" }} >
          <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
            {/* Side Navigation */}
            {isSmallScreen ? null : (
              <Grid
                item
                size={2}
                sx={{
                  height: "100vh",
                  overflowY: "auto",
                  overflowX:"hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="side-nav"
              >
                <SideNavBar />
                <GroupNavBar />
                <FriendsNavBar />
              </Grid>
            )}
            {/* Main Content */}
            <Grid
              item
              size={{ xs: 12, lg: 10 }}
              sx={{
                height: "100vh",
                overflowY: "auto",
              }}
              className="main-scroll-bar"
            >
              <Box sx={{ ml: { md: "15px" }, height: "100%" }}>
                <SearchBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/activities" element={<Activity />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/expenses/" element={<Expense />} />
                  <Route path="/expenses/group/:groupId" element={<Expense />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default App;
