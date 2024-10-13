import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { loggedInUserAtom } from '../atoms/UserAtom';
import { refetchBalanceSummaryAtom } from '../atoms/Atoms';
import { backendService } from '../services/backendServices';

const BalanceBoard = () => {

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:900px)');
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [refetchBalance, setRefetchBalance] = useAtom(refetchBalanceSummaryAtom);
  const [oweAmount, setOweAmount] = useState(0.00);
  const [owedAmount, setOwedAmount] = useState(0.00);

  // Set font size based on screen size
  const getFontSize = () => {
    if (isSmallScreen) return '1.5rem';
    if (isMediumScreen) return '2rem';
    return '2rem'; // Default to large screen font size
  };
  const getBalancesSummary = async () => {
      const balanceInfo = await backendService.getBalanceSummary(loggedInUser.userId);
      if (balanceInfo) {
        setOweAmount(balanceInfo.oweAmount);
        setOwedAmount(balanceInfo.owedAmount);
      }
    }

  useEffect(() => {
    getBalancesSummary();
  }, []);

  useEffect(() => {
    if(refetchBalance)
    {
      getBalancesSummary();
    }
    setRefetchBalance(false);

  }, [refetchBalance]);

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
            sx={{ fontSize: getFontSize() }} // Dynamically adjust font size
          >
            ₹{(oweAmount && owedAmount && Math.abs(oweAmount - owedAmount).toFixed(2)) ||  Number(0).toFixed(2)}
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
            ₹{owedAmount ? owedAmount.toFixed(2) : Number(0).toFixed(2)}
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
            ₹{oweAmount ? oweAmount.toFixed(2) :  Number(0).toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BalanceBoard;
