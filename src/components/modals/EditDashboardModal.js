import React, { useState, useEffect } from 'react'
import { Box, Button, Dialog, DialogContent, IconButton, Typography, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { handleAddDashColumn, handleDeleteDashboardColumn, handleGetDashboardColumn } from '@/redux/action/dashboardAction';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';

const EditDashboardModal = ({ handleOpenEditDashboard, openEditDashboardModal }) => {
    const [listName, setListName] = useState("")
    const { message, columns, error } = useSelector(state => state.dashboardReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(handleGetDashboardColumn())
    }, [])

    const handleAddColumn = (e) => {
        e.preventDefault()
        dispatch(handleAddDashColumn(listName))
    }

    useEffect(() => {
        if (!error && message === "added successfully") {
            toast.success("Column added successfully.")
            setListName("")
            dispatch(handleGetDashboardColumn())
        } else if (error && message === "failed to add") {
            toast.error("Failed to add column.")
        }
    }, [message, error])

    const deleteDashColumn = (_id) => {
        dispatch(handleDeleteDashboardColumn(_id))
    }

    useEffect(() => {
        if (columns === null && message === "delete success" && error === false) {
            toast.success('Dashboard column deleted.')
            dispatch(handleGetDashboardColumn())
        } else if (columns === null && message === "delete failed" && error === true) {
            toast.success('Failed to delete dashboard column.')
        }
    }, [message, error])


    return (
        <>
            <Dialog maxWidth="xs" fullWidth open={openEditDashboardModal}>
                <DialogContent>
                    <Box className="d-flex justify-content-between align-items-center">
                        <Typography variant='h4'>Edit Board</Typography>
                        <IconButton className='bg--primary' onClick={() => handleOpenEditDashboard(false)}><Close className='text-dark' /></IconButton>
                    </Box>
                    <Box mt={2}>
                        <form onSubmit={handleAddColumn}>
                            <Box mb={2}>
                                <TextField variant='outlined' label="List Name" name="listName" fullWidth value={listName} onChange={(e) => setListName(e.target.value)} required />
                            </Box>
                            <Box>
                                <Button type='submit' variant='contained' className='primary-button' fullWidth size='large' >Add</Button>
                            </Box>
                        </form>
                    </Box>
                    <Box mt={4}>
                        <Typography variant='h4' gutterBottom>Board Column</Typography>
                        {
                            columns && columns !== null && columns !== undefined && columns !== "" && columns.length > 0 && columns.map(item => <Box p={0.25} key={item._id} mb={2} className="border d-flex justify-content-between align-items-center">
                                <Typography>{item.listName}</Typography>
                                <IconButton onClick={() => deleteDashColumn(item._id)}><Close /></IconButton>
                            </Box>)
                        }
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditDashboardModal