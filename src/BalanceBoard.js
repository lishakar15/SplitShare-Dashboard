import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const BalanceBoard = () => {
  return (
    <Box container sx={{
        display:'flex',
        justifyContent:'center',
        mt:2,
        }}>
        <Card sx={{flex:1,border:"1px solid #e5e7eb"}}>
            <CardContent sx={{ml:"15px"}}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                Your Balance
                </Typography>
                <Typography variant="h4" component="div" color="#16a34a">
                $284.00 
                </Typography>
            </CardContent>
        </Card> 
        <Card sx={{flex:1,border:"1px solid lightgray"}}>
            <CardContent sx={{ml:"15px"}}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                Your get
                </Typography>
                <Typography variant="h4" component="div" color="#16a34a">
                $549.00 
                </Typography>
            </CardContent>
        </Card>
        <Card sx={{flex:1,border:"1px solid lightgray"}}>
            <CardContent sx={{ml:"15px"}}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 16 }}>
                Your owe
                </Typography>
                <Typography variant="h4" component="div" color="red">
                $265.00 
                </Typography>
            </CardContent>
        </Card>
    </Box>
  );
}

export default BalanceBoard;
