import { Edit } from '@mui/icons-material'
import { Container, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Box } from '@mui/material'
import React from 'react'

const sidebar = ({ openSidebar, handleOpenEditDashboard }) => {
    return (
        <>
            <aside className={`dashboard-slidebar ${openSidebar ? 'show' : 'hide'} shadow`}>
                <Box>
                    <List disablePadding sx={{ display: 'block' }} className='border'>
                        <ListItem className='px-0'>
                            <ListItemButton sx={{ justifyContent: openSidebar ? 'end' : 'center', }} onClick={() => handleOpenEditDashboard(true)}>
                                <ListItemIcon sx={{ mr: openSidebar ? 3 : 'auto', justifyContent: 'center', minWidth: 0 }}>
                                    <Edit />
                                </ListItemIcon>
                                <ListItemText primary={openSidebar ? 'Edit Board' : ''} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </aside>
        </>
    )
}

export default sidebar