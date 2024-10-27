import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { loggedInUserAtom } from '../atoms/UserAtom';
import { backendService } from '../services/backendServices';
import { refetchTriggerAtom } from '../atoms/Atoms';

const BalanceBoard = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:900px)');
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [oweAmount, setOweAmount] = useState(0);
  const [owedAmount, setOwedAmount] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [refreshTrigger] = useAtom(refetchTriggerAtom);

  const getFontSize = () => {
    if (isSmallScreen) return '1rem';
    if (isMediumScreen) return '1.5rem';
    return '2rem';
  };

  const getBalancesSummary = useCallback(async () => {
    try {
      const balanceInfo = await backendService.getBalanceSummary(loggedInUser.userId);
      if (balanceInfo) {
        setOweAmount(Number(balanceInfo.oweAmount) || 0);
        setOwedAmount(Number(balanceInfo.owedAmount) || 0);
      }
    } catch (error) {
      console.error("Error fetching balance summary:", error);
    }
  }, [loggedInUser.userId]);

  useEffect(() => {
    getBalancesSummary();
  }, [getBalancesSummary, refreshTrigger]);

  useEffect(() => {
    const calculatedTotalBalance = (owedAmount - oweAmount).toFixed(2);
    setTotalBalance(calculatedTotalBalance);
  }, [owedAmount, oweAmount]);

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toFixed(2)}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        gap: isSmallScreen ? 0.3 : 1,
      }}
    >
      <Card
        sx={{
          flex: 1,
          border: '1px solid #e5e7eb',
          minWidth: isSmallScreen ? '80px' : 'auto',
          padding: isSmallScreen ? '8px' : '16px',
        }}
      >
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', textAlign: isSmallScreen ? "center" : "left"}}>
            Your Balance
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: getFontSize(),
              color: totalBalance >= 0 ? 'green' : 'red',
              textAlign: isSmallScreen ? "center" : "left"
            }}
          >
            {formatCurrency(Math.abs(totalBalance))}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          flex: 1,
          border: '1px solid lightgray',
          minWidth: isSmallScreen ? '80px' : 'auto',
          padding: isSmallScreen ? '8px' : '16px',
        }}
      >
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', textAlign: isSmallScreen ? "center" : "left"}}>
            You Get
          </Typography>
          <Typography
            variant="h4"
            component="div"
            color="#16a34a"
            sx={{ fontSize: getFontSize(), textAlign: isSmallScreen ? "center" : "left"}}
          >
            {formatCurrency(owedAmount)}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          flex: 1,
          border: '1px solid lightgray',
          minWidth: isSmallScreen ? '80px' : 'auto',
          padding: isSmallScreen ? '8px' : '16px',
        }}
      >
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', textAlign: isSmallScreen ? "center" : "left"}}>
            You Owe
          </Typography>
          <Typography
            variant="h4"
            component="div"
            color="red"
            sx={{ fontSize: getFontSize(), textAlign: isSmallScreen ? "center" : "left"}}
          >
            {formatCurrency(oweAmount)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BalanceBoard;
