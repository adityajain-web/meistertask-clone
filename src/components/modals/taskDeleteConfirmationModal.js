import { DeleteMainTask, clearTaskDeletionResponse } from '@/redux/action/taskAction'
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const TaskDeleteConfirmationModal = ({ openTaskDeleteConfirmationModal, setOpenTaskDeleteConfirmationModal, taskToBeDelete, handleTaskDeleteSuccess }) => {
    const dispatch = useDispatch()
    const { error, message } = useSelector(state => state.taskReducer)

    const handleTaskDelete = () => {
        const { listId, taskId } = taskToBeDelete
        dispatch(DeleteMainTask(listId, taskId))
    }

    useEffect(() => {
        if (error && message === "failed") {
            toast.error('Failed To Delete Task.')
        } else if (!error && message === "success") {
            toast.success('Task Deleted Successfully.')
            handleTaskDeleteSuccess()
        }
    }, [error, message])

    return (
        <>
            <Dialog maxWidth="xs" fullWidth open={openTaskDeleteConfirmationModal}>
                <DialogContent>
                    <Typography variant='h4'>Are you sure you want to delete this task?</Typography>
                    <Box mt={2} className="d-flex justify-content-center">
                        <Button className='btn btn-danger me-3' onClick={handleTaskDelete}>Delete</Button>
                        <Button className='btn btn-secondary' onClick={() => setOpenTaskDeleteConfirmationModal(false)}>Cancel</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TaskDeleteConfirmationModal