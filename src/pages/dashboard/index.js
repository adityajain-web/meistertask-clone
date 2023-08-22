import { Button } from '@mui/material';
import React from 'react';
import { handleUserLogout } from '@/redux/action/userActions';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(handleUserLogout());
    };

    return (
        <div>
            <Button onClick={handleLogoutClick}>Logout</Button>
        </div>
    );
};

export default Dashboard;
