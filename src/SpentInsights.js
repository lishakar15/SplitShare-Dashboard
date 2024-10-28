import React from 'react';
import { 
  Box, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Grid, 
  Divider 
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import TimelineIcon from '@mui/icons-material/Timeline';
import ActivityIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';

const SpendingInsights = () => {
  const spendingData = [
    { name: 'Food', value: 35 },
    { name: 'Rent', value: 30 },
    { name: 'Utilities', value: 20 },
    { name: 'Entertainment', value: 15 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Spending Insights
      </Typography>
      
      <Grid container spacing={3}>
        {/* Spending Distribution */}
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={1}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimelineIcon sx={{ fontSize: 20 }} />
                  <Typography variant="h6">Spending Distribution</Typography>
                </Box>
              }
            />  
            <CardContent>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {spendingData.map((entry, index) => (
                  <Grid item xs={6} key={entry.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        sx={{ 
                          width: 12, 
                          height: 12, 
                          borderRadius: '50%', 
                          bgcolor: COLORS[index % COLORS.length] 
                        }} 
                      />
                      <Typography variant="body2">
                        {entry.name}: {entry.value}%
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={1}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ActivityIcon sx={{ fontSize: 20 }} />
                  <Typography variant="h6">Recent Activity</Typography>
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { user: 'Ankur', amount: 250, type: 'owes' },
                  { user: 'Lishakar', amount: 200, type: 'paid' },
                  { user: 'Andy', amount: 150, type: 'owes' }
                ].map((activity, index) => (
                  <React.Fragment key={index}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        py: 1
                      }}
                    >
                      <Typography variant="body2">{activity.user}</Typography>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: activity.type === 'owes' ? 'success.main' : 'error.main'
                        }}
                      >
                        ₹{activity.amount}
                      </Typography>
                    </Box>
                    {index < 2 && <Divider />}
                  </React.Fragment>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Group Stats */}
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={1}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupIcon sx={{ fontSize: 20 }} />
                  <Typography variant="h6">Group Statistics</Typography>
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Most Active Group
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    Awesome Group
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Settlements
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    ₹1,200 this month
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pending Settlements
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    ₹350
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpendingInsights;