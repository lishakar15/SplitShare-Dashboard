import React from 'react';
import SideNavBar from './SideNavBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import MainSection from './MainSection';
import Divider from '@mui/material/Divider';
import { useMediaQuery } from '@mui/material';



const Home = () =>{

    const isSmallScreen = useMediaQuery('(max-width:1200px)');
      
    return(
        <>
            <Box sx={{ flexGrow: 1,m:1}}>
            <Grid container sx={{height:"100vh"}}>
            {isSmallScreen? null : 
                    <Grid size={2}>
                    <SideNavBar/>
                </Grid>
            }
                <Grid size={{sm:12,md:12,lg:10}}>
                    <MainSection/>
                </Grid>
            </Grid>
          </Box>
        </>
    )
}

export default Home;