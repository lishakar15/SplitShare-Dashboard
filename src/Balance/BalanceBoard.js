import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

const BalanceBoard = () => {

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:900px)');

  // Set font size based on screen size
  const getFontSize = () => {
    if (isSmallScreen) return '1.5rem';
    if (isMediumScreen) return '2rem';
    return '2rem'; // Default to large screen font size
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        gap: 0.5, 
      }}
    >
      <Card sx={{ flex: 1, border: '1px solid #e5e7eb' }}>
        <CardContent>
          <Typography 
            gutterBottom 
            sx={{ color: 'text.secondary', fontSize: 16 }}
          >
            Your Balance
          </Typography>
          <Typography 
            variant="h4" 
            component="div" 
            color="#16a34a"
            sx={{ fontSize: getFontSize() }} // Dynamically adjust font size
          >
            ₹28483.00
          </Typography>
        </CardContent>
      </Card> 

      <Card sx={{ flex: 1, border: '1px solid lightgray' }}>
        <CardContent>
          <Typography 
            gutterBottom 
            sx={{ color: 'text.secondary', fontSize: 16 }}
          >
            Your Get
          </Typography>
          <Typography 
            variant="h4" 
            component="div" 
            color="#16a34a"
            sx={{ fontSize: getFontSize() }} // Dynamically adjust font size
          >
            ₹549.00
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1, border: '1px solid lightgray' }}>
        <CardContent>
          <Typography 
            gutterBottom 
            sx={{ color: 'text.secondary', fontSize: 16 }}
          >
            Your Owe
          </Typography>
          <Typography 
            variant="h4" 
            component="div" 
            color="red"
            sx={{ fontSize: getFontSize() }} // Dynamically adjust font size
          >
            ₹265.00
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BalanceBoard;
