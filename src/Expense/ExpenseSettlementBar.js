import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import AddExpenseButton from './Create Expense/AddExpenseButton'
import SettleUpButton from '../SettleUpButton'

const ExpenseSettlementBar = () => {
    return (
        <Card sx={{ my: 2, border: "1px solid #e5e7eb" }} >
            <CardContent>
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Typography variant='h5' sx={{ml:2}}>
                        Expenses
                    </Typography>
                        <AddExpenseButton />
                </Box>
            </CardContent>
        </Card >
    )
}

export default ExpenseSettlementBar;
