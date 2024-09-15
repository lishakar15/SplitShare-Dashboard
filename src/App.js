import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Activity from "./Activity";
import Friends from "./Friends";
import Groups from "./Groups";
import Expense from "./Expenses";
import PageNotFound from "./PageNotFound";
import SideNavBar from "./SideNavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useMediaQuery } from "@mui/material";
import SearchBar from "./SearchBar";

function App() {
  const isSmallScreen = useMediaQuery("(max-width:1200px)");

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Grid container sx={{ height: "100vh" }}>
          {isSmallScreen ? null : (
            <Grid size={2}>
              <SideNavBar />
            </Grid>
          )}
          <Grid size={{ sm: 12, md: 12, lg: 10 }}>
            <Box container sx={{ ml: "15px" }}>
              <SearchBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/activities" element={<Activity />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/expenses" element={<Expense />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
