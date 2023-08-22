import React, { useState } from 'react'
import { Avatar, Box, Button, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material'
import { Close, ExitToApp, Menu, Person, Settings, TvOff } from '@mui/icons-material'
import Logo from '@/images/black-logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { handleUserLogout } from '@/redux/action/userActions'
import { useRouter } from 'next/router'

const topbar = ({ handleOpenSidebar, openSidebar }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null)
    const { user } = useSelector(state => state.userReducer)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    console.log(user)

    const handleLogout = () => {
        dispatch(handleUserLogout())
        router.push('/auth')
    }

    return (
        <>
            <section className='dashboard-topbar shadow-sm'>
                <Container maxWidth="xxl">
                    <Box py={2} className="d-flex">
                        <Box>
                            <IconButton className='me-3' onClick={() => handleOpenSidebar(!openSidebar)}>{openSidebar ? <Close className='text--secondary' /> : <Menu className='text--secondary' />}</IconButton>
                            <img src={Logo.src} alt="Logo" className='img-fluid logo' />
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                            <Avatar component={IconButton} onClick={handleClick} {...stringAvatar(`${user && user !== null && user !== undefined && user !== "" && Object.keys(user).length > 0 && user.firstname && user.firstname !== null && user.firstname !== undefined && user.firstname !== "" && user.firstname.split("")[0]} ${user && user !== null && user !== undefined && user !== "" && Object.keys(user).length > 0 && user.lastname && user.lastname !== null && user.lastname !== undefined && user.lastname !== "" && user.lastname.split("")[0]}`)} />
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <List className='p-0 m-0'>
                                    <ListItem style={{ cursor: "pointer" }}>
                                        <ListItemIcon><Person /></ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }}>
                                        <ListItemIcon><Settings /></ListItemIcon>
                                        <ListItemText primary="Setting" />
                                    </ListItem>
                                    <ListItem onClick={handleLogout} style={{ cursor: "pointer" }}>
                                        <ListItemIcon><ExitToApp /></ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </List>
                            </Popover>
                        </Box>
                    </Box>
                </Container>
            </section>
        </>
    )
}

export default topbar