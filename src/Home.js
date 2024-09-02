import React from 'react';
import SideNavBar from './SideNavBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import MainSection from './MainSection';
import Divider from '@mui/material/Divider';



const Home = () =>{
      
    return(
        <>
            <Box sx={{ flexGrow: 1}}>
            <Grid container sx={{height:"100vh"}}>
                <Grid size={2}>
                    <SideNavBar/>
                </Grid>
                <Grid size={10}>
                    <MainSection/>
                </Grid>
            </Grid>
          </Box>
        </>
    )
}

export default Home;