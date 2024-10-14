import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const ActivityBar = () => {

    return (
        <Card sx={{ my: 2, border: "1px solid #e5e7eb" }}>
            <CardContent
                sx={{
                    mx: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" sx={{ color: "black" }}>
                    Recent Activities
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ActivityBar; 