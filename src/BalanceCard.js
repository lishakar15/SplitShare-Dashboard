import { Box, Avatar, Chip, Button, Divider } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { USER_BALANCES } from './data/BalanceData';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EastIcon from '@mui/icons-material/East';
import AvatarGenerator from './AvatarGenerator';

const BalanceCard = () => {
  return (
    <Box sx={{ flexGrow: 1, }}>
      <Grid container spacing={2}>
        {USER_BALANCES.map((balance) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={balance.userName}>
            <Card sx={{ border: '1px solid #e5e7eb', height: '100%', display: 'flex' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                {/** First Line in card */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AvatarGenerator userName={balance.userName}/>
                  <Box sx={{ ml: 1, flexShrink: 0 }}>
                    <Typography
                      sx={{
                        maxWidth: '100px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {balance.userName}
                    </Typography>
                    <Chip
                      label={balance.isOwed ? `Owes you ₹${balance.balanceAmount}` : `You owe ₹${Math.abs(balance.balanceAmount)}`}
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
                    <Typography component="a" href="#" sx={{ ml: 1, color:"black",textDecoration:"none", '&:hover': { textDecoration: 'underline' }}}>
                      {balance.groupName}
                    </Typography>
                  </Box>
                  <Typography color={balance.isOwed ? 'success' : 'error'}>
                    {balance.isOwed ? '+' : '-'}₹{balance.balanceAmount}
                  </Typography>
                </Box>

                {/** Settle Up Button */}
                <Button
                  variant="outlined"
                  sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    border: 'none',
                    textTransform: 'none',
                    color: 'black',
                    mt: 'auto',
                  }}
                >
                  Settle up<EastIcon sx={{ fontSize: '15px', ml: '5px' }} />
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BalanceCard;
