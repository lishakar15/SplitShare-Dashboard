import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import AvatarGenerator from '../AvatarGenerator'
import { useAtomValue } from 'jotai'
import { loggedInUserAtom } from '../atoms/UserAtom'
import CustomSettleUpButton from '../Payment/CustomSettleUpButton'
import { backendService } from '../services/backendServices'
import { settleButtonRefAtom } from '../atoms/ExpenseAtom'

const GroupBalanceCardsSection = ({ groupId }) => {

    const loggedInUser = useAtomValue(loggedInUserAtom);
    const [balanceList, setBalanceList] = useState(null);
    const settleButtonRef = useAtomValue(settleButtonRefAtom);

    useEffect(() => {
        const getBalancesOfUser = async () => {
            try {
                const response = await backendService.getBalancesOfUserInGroup(groupId, loggedInUser.userId)
                if (response !== null) {
                    setBalanceList(response);
                }
            }
            catch (err) {
                console.log("Error occurred while fetching user balances");
            }
        }

        getBalancesOfUser();
    }, []);

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Box
                sx={{
                    display: 'inline-flex',
                    overflowX: 'auto',
                    paddingBottom: 2,
                    '&::-webkit-scrollbar': { height: 1 },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#c1c1c1',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-track': { backgroundColor: '#f0f0f0' },
                }}
            >
                {balanceList && balanceList.map((balance, index) => (
                    <Box key={index} sx={{ minWidth: '300px', marginRight: 2, display: 'inline-block' }}>
                        <Card sx={{ border: '1px solid #e5e7eb', height: '100%', display: 'flex' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <AvatarGenerator userName={balance.userId !== loggedInUser.userId ? balance.userName : balance.owesToUserName} />
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
                                    <CustomSettleUpButton balance={balance} ref ={settleButtonRef} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default GroupBalanceCardsSection;
