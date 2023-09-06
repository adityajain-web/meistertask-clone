import { Edit } from '@mui/icons-material'
import { Container, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const sidebar = ({ openSidebar, handleOpenEditDashboard }) => {
    const { user } = useSelector(state => state.userReducer)
    return (
        <>
            {
                user && user !== null && user !== undefined && user !== "" && Object.keys(user).length > 0 && <aside className={`dashboard-slidebar ${openSidebar ? 'show' : 'hide'} shadow`}>
                    <Box>
                        <List disablePadding sx={{ display: 'block' }} style={{ borderBottom: "1px solid #ffffff40" }}>
                            <ListItem className='px-0' disabled={!user.isAdmin}>
                                <ListItemButton sx={{ justifyContent: openSidebar ? 'end' : 'center', }} onClick={() => user.isAdmin && handleOpenEditDashboard(true)}>
                                    <ListItemIcon sx={{ mr: openSidebar ? 3 : 'auto', justifyContent: 'center', minWidth: 0 }}>
                                        <Edit className='text-white' />
                                    </ListItemIcon>
                                    <ListItemText primary={openSidebar ? 'Edit Board' : ''} className='text-white' />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </aside>
            }
        </>
    )
}

export default sidebar