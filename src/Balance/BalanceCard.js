import { Box, Avatar, Chip, Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AvatarGenerator from '../AvatarGenerator';
import CustomSettleUpButton from '../Payment/CustomSettleUpButton';
import { useAtom, useAtomValue } from 'jotai';
import { loggedInUserAtom } from '../atoms/UserAtom';
import { backendService } from '../services/backendServices';
import { Link } from 'react-router-dom';
import { refetchTriggerAtom } from '../atoms/Atoms';

const BalanceCard = () => {

  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [balanceList, setBalanceList] = useState(null);
  const [refreshTrigger,setRefreshTrigger] = useAtom(refetchTriggerAtom);

  useEffect(()=>{

    const getBalances = async () =>{
      try{
        const balances = await backendService.getBalancesOfUser(loggedInUser.userId);
        setBalanceList(balances);
      }
      catch(err){
        console.log("Error fecthing Balances for user "+err);
      }
    }
    getBalances();
    
  },[refreshTrigger]);


  return (
    <Box sx={{ flexGrow: 1, }}>
      <Grid container spacing={2}>
        {balanceList && balanceList.map((balance,index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
            <Card sx={{ border: '1px solid #e5e7eb', height: '100%', display: 'flex' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                {/** First Line in card */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AvatarGenerator userName={balance.userId !== loggedInUser.userId ? balance.userName : balance.owesToUserName}/>
                  <Box sx={{ ml: 1, flexShrink: 0 }}>
                    <Typography
                      sx={{
                        maxWidth: '100px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {balance.userId !== loggedInUser.userId ? balance.userName : balance.owesToUserName}
                    </Typography>
                    <Chip
                      label={balance.isOwed ? `Owes you ₹${balance.balanceAmount.toFixed(2)}` : `You owe ₹${Math.abs(balance.balanceAmount).toFixed(2)}`}
                      color={balance.isOwed ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>

                {/** Second Line in card */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <GroupsOutlinedIcon  sx={{color:"gray"}}/>
                    <Link style={{ textDecoration: "none" }} to={`/expenses/group/${balance.groupId}`} onClick={(event)=>event.stopPropagation()}>
                      <Typography sx={{ color: "gray", "&:hover": { textDecoration:"underline" }, ml:1 }}>{balance.groupName}</Typography>
                    </Link>
                  </Box>
                  <Typography color={balance.isOwed ? 'success' : 'error'}>
                    {balance.isOwed ? '+' : '-'}₹{balance.balanceAmount.toFixed(2)}
                  </Typography>
                </Box>

                {/** Settle Up Button */}
                <CustomSettleUpButton balance={balance}/>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BalanceCard;
