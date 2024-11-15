import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { backendService } from './services/backendServices';
import { loggedInUserAtom } from './atoms/UserAtom';
import { COLORS } from "./data/Colors";
import { useAtomValue } from 'jotai';
import { refetchTriggerAtom } from './atoms/Atoms';
import { useAtom } from 'jotai';

const SpendingInsights = () => {
  const [spendingData, setSpendingData] = useState([]);
  const [totalSettlements, setTotalSettlements] = useState(0);
  const [pendingSettlments, setPendingSettltments] = useState(0);
  const [mostActiveGroup, setMostActiveGroup] = useState("none");
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const [refreshTrigger] = useAtom(refetchTriggerAtom);
  const [key, setKey] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const defaultSpendingData = [
    { category: "none", percentage: 100 }
  ];

  const displayData = spendingData && spendingData.length > 0 ? spendingData : defaultSpendingData;

  useEffect(() => {

    const getSpendingList = async () => {
      try {
        const response = await backendService.getSpendingDistribution(loggedInUser.userId);
        if (response) {
          setSpendingData(response);
          setKey((prev) => prev + 1);
        }
        else {
          setSpendingData([]);
        }
      }
      catch (err) {
        console.log("Error fetching spending distribution " + err);
        setSpendingData([]);
      }
    }
    getSpendingList();
  }, [refreshTrigger]);

  useEffect(() => {
    const getSettlementData = async () => {
      try {
        const settlementData = await backendService.getSettlementForInsights(loggedInUser.userId);
        if (settlementData) {
          setTotalSettlements(settlementData.totalSettlements);
          setPendingSettltments(settlementData.pendingSettlements);
        }
      }
      catch (err) {
        console.log("Error fetching settlement data for insights " + err)
      }
    }
    getSettlementData();
  }, [refreshTrigger]);

  useEffect(() => {

    const getActiveGroup = async () => {
      try {
        const response = await backendService.getMostActiveGroup(loggedInUser.userId);
        console.log("Respone == " + response);
        if (response) {
          setMostActiveGroup(response);
        }
      }
      catch (err) {
        console.log("Error fetching Most Active Group " + err);
        setMostActiveGroup("none")
      }
    }
    getActiveGroup();
  }, [refreshTrigger]);

  const StatCard = ({ icon: Icon, title, value, info, color }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        backgroundColor: `${color}10`,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: `${color}20`,
          borderRadius: '12px',
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ color: color, fontSize: 24 }} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Tooltip title={info}>
            <IconButton size="small">
              <InfoOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="h6">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ py: 1 }}>
      <Grid container spacing={2}>
        {/* Spending Distribution */}
        <Grid item xs={12} md={7}>
          <Card elevation={1} sx={{ margin: -1 }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, m: -1 }}>
                  <TimelineIcon sx={{ fontSize: 20 }} />
                  <Typography variant="h6">Spending Distribution</Typography>
                </Box>
              }
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  gap: 1,
                  m: -1,
                }}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart key={key}>
                    <Pie
                      animationBegin={0}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      data={displayData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="percentage"
                    >
                      {displayData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <Grid container spacing={1} sx={{ mt: isMobile ? 2 : 0 }}>
                  {displayData.map((entry, index) => (
                    <Grid item xs={6} key={entry.category}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: COLORS[index % COLORS.length],
                          }}
                        />
                        <Typography variant="body2">
                          {entry.category}: {entry.percentage}%
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Group Stats */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StatCard
                icon={AccountBalanceWalletIcon}
                title="Total Settlements"
                value={totalSettlements ? totalSettlements.toFixed(2) : 0}
                info="Total amount settled this month"
                color={theme.palette.primary.main}
              />
            </Grid>
            <Grid item xs={12}>
              <StatCard
                icon={PendingActionsIcon}
                title="Pending Settlements"
                value={pendingSettlments ? pendingSettlments.toFixed(2) : 0}
                info="Amount pending to be settled"
                color={theme.palette.warning.main}
              />
            </Grid>
            <Grid item xs={12}>
              <StatCard
                icon={TrendingUpIcon}
                title="Most Active Group"
                value={mostActiveGroup}
                info="Group with highest activity this month"
                color={theme.palette.success.main}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpendingInsights;