import "./App.css";
import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./Home";
import Activity from "./ActivityList";
import Friends from "./Friends";
import Groups from "./Group/Groups";
import Expense from "./Expense/Expenses";
import SideNavBar from "./SideNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useMediaQuery } from "@mui/material";
import SearchBar from "./SearchBar";
import { isUserLoggedInAtom, loggedInUserAtom } from "./atoms/UserAtom";
import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";
import { useAtom } from "jotai";

function App() {
  const isSmallScreen = useMediaQuery("(max-width:1200px)");
  const [isUserLoggedIn,setIsUserLoggedIn] = useAtom(isUserLoggedInAtom)
  return (
    <>
      {!isUserLoggedIn ? (
        <Routes>
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="*"  element={<LoginUser/>}/>
        </Routes>
      ) : (
        <Box sx={{ m: 1 }}>
          <Grid container sx={{ height: "100vh" }}>
            {isSmallScreen ? null : (
              <Grid size={2}>
                <SideNavBar />
              </Grid>
            )}
            <Grid size={{ xs: 12, lg: 10 }}>
              <Box container sx={{ ml: "15px" }}>
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
