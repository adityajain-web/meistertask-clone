import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Circle, Close } from '@mui/icons-material'

const BoardListCard = ({ id, listName, listColor, deleteDashColumn }) => {
    return (
        <>
            <Box py={0.25} px={1} mb={2} className="border d-flex justify-content-between align-items-center">
                <Typography><Circle className='me-3' style={{ color: listColor }} />{listName}</Typography>
                <IconButton onClick={() => deleteDashColumn(id)}><Close /></IconButton>
            </Box>
        </>
    )
}

export default BoardListCard