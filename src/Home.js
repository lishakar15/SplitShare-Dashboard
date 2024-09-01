import React from 'react';
import SideNavBar from './SideNavBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';



const Home = () =>{
      
    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{height:"100vh"}}>
                <Grid size={2}>
                    <SideNavBar/>
                </Grid>
            </Grid>
          </Box>
        </>
    )
}

export default Home;