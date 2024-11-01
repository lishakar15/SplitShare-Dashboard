import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Chip, Skeleton } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AvatarGenerator from '../AvatarGenerator';
import CustomSettleUpButton from '../Payment/CustomSettleUpButton';
import { useAtom, useAtomValue } from 'jotai';
import { loggedInUserAtom } from '../atoms/UserAtom';
import { backendService } from '../services/backendServices';
import { Link } from 'react-router-dom';
import { refetchTriggerAtom } from '../atoms/Atoms';
import { settleButtonRefAtom } from '../atoms/ExpenseAtom';

const BalanceCard = () => {
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [balanceList, setBalanceList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger] = useAtom(refetchTriggerAtom);
  const settleButtonRef = useAtomValue(settleButtonRefAtom);

  useEffect(() => {
    const getBalances = async () => {
      setIsLoading(true);
      try {
        const balances = await backendService.getBalancesOfUser(loggedInUser.userId);
        setBalanceList(balances);
      } catch (err) {
        console.error('Error fetching Balances for user:', err);
      } finally {
        setIsLoading(false);
      }
    };
    getBalances();
  }, [refreshTrigger, loggedInUser]);

  const renderBalanceCard = (balance, index) => {
    const otherUserName = balance.userId !== loggedInUser.userId ? balance.userName : balance.owesToUserName;
    const formattedAmount = balance.balanceAmount.toFixed(2);

    return (
      <Box 
        key={index} 
        sx={{
          minWidth: { xs: '300px', sm: '350px' },
          maxWidth: { xs: '350px', sm: '400px' },
          mr:2,
          '&:last-child': { mr: 0 }
        }}
      >
        <Card 
          elevation={1}
          sx={{ 
            height: '100%',
            border: '1px solid #e5e7eb',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 3
            }
          }}
        >
          <CardContent>
            {/* User Info Section */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              borderBottom: '1px solid #f0f0f0',
              pb:1
            }}>
              <AvatarGenerator userName={otherUserName} />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 500,
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {otherUserName}
                </Typography>
                <Chip
                  label={balance.isOwed 
                    ? `Owes you ₹${formattedAmount}` 
                    : `You owe ₹${Math.abs(formattedAmount)}`
                  }
                  color={balance.isOwed ? 'success' : 'error'}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    '& .MuiChip-label': { 
                      fontSize: '0.75rem',
                      fontWeight: 500 
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Group Info Section */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              backgroundColor: '#f8f9fa',
              p: 1,
              borderRadius: 1
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                flex: 1,
                minWidth: 0
              }}>
                <GroupsOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Link 
                  to={`/expenses/group/${balance.groupId}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ 
                    textDecoration: 'none',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: 'text.secondary',
                      ml: 1,
                      '&:hover': { textDecoration: 'underline' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {balance.groupName}
                  </Typography>
                </Link>
              </Box>
              <Typography 
                sx={{ 
                  color: balance.isOwed ? 'success.main' : 'error.main',
                  fontWeight: 500,
                  ml: 1
                }}
              >
                {balance.isOwed ? '+' : '-'}₹{formattedAmount}
              </Typography>
            </Box>

            {/* Settle Up Button */}
            <CustomSettleUpButton 
              balance={balance} 
              ref={index === 0 ? settleButtonRef : null}
            />
          </CardContent>
        </Card>
      </Box>
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', gap: 2, p: 2, overflowX: 'auto' }}>
        {[1, 2, 3].map((i) => (
          <Skeleton 
            key={i}
            variant="rectangular"
            width={350}
            height={200}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box 
        sx={{
          display: 'flex',
          overflowX: 'auto',
          py: 1,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { 
            height: 6,
            borderRadius: 3
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: 3,
            '&:hover': {
              backgroundColor: '#a1a1a1'
            }
          },
          '&::-webkit-scrollbar-track': { 
            backgroundColor: '#f0f0f0',
            borderRadius: 3
          },
        }}
      >
        {balanceList?.map(renderBalanceCard)}
      </Box>
    </Box>
  );
};

export default BalanceCard;