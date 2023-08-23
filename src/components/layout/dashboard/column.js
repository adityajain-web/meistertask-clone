import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import React from 'react'

const Column = ({ title }) => {
    return (
        <>
            <Card className='shadow-none border dashboard-column'>
                <CardContent sx={{ height: "100%" }}>
                    <Box>
                        <Typography variant='h4' gutterBottom>{title || 'List'}</Typography>
                        <Divider className='bg--primary' />
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default Column