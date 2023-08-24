import { handleFetchAllUsers } from '@/redux/action/userActions'
import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogContent, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FileBase64 from 'react-file-base64';
import { handleAddTask } from '@/redux/action/dashboardAction'
import { toast } from 'react-toastify'



const AddTaskModal = ({ openAddTaskModal, openTaskModalListId, FetchColumnOnTaskAddSuccess, handleOpenAddTaskModal }) => {
    const dispatch = useDispatch()
    const { users, user } = useSelector(state => state.userReducer)
    const { message, error } = useSelector(state => state.dashboardReducer)

    const [task, setTask] = useState({
        taskName: "", assignTo: "", dueDate: "", attachment: null, description: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })
    }

    useEffect(() => {
        if (openAddTaskModal) {
            dispatch(handleFetchAllUsers())
        }
    }, [openAddTaskModal])

    const handleAddNewTask = (e) => {
        e.preventDefault()
        const { taskName, assignTo, dueDate, attachment, description } = task;

        if (user && Object.keys(user).length > 0) {
            if (taskName) {
                const newTask = {
                    taskName,
                    assignTo,
                    dueDate: new Date(dueDate).getTime(),
                    // attachment,
                    description,
                    assignBy: user._id,
                    listId: openTaskModalListId
                };

                dispatch(handleAddTask(newTask));
            }
        }
    };

    useEffect(() => {
        if (message === "task added suucessfully" && !error) {
            toast.success("Task added successfully.");
            setTask({ taskName: "", assignTo: "", dueDate: "", description: "" });
            FetchColumnOnTaskAddSuccess()
            handleOpenAddTaskModal(false)
        } else if (message === "failed to add task." && error) {
            toast.success("Failed to add task.");
            setTask({ taskName: "", assignTo: "", dueDate: "", description: "" });
        }
    }, [message, error])

    return (
        <>
            <Dialog maxWidth="xs" fullWidth open={openAddTaskModal}>
                <DialogContent>
                    <Box>
                        <Box className="d-flex justify-content-between align-items-center">
                            <Typography variant='h4'>Add a Task</Typography>
                            <IconButton className='bg--primary' onClick={() => handleOpenAddTaskModal(false)}><Close className='text--secondary' /></IconButton>
                        </Box>
                        <Box mt={2}>
                            <form onSubmit={handleAddNewTask} method='POST'>
                                <Box mb={2}>
                                    <TextField variant='outlined' label="Task Name" fullWidth value={task.taskName} onChange={handleOnChange} required name='taskName' />
                                </Box>
                                {
                                    user && user !== null && user !== undefined && user !== "" && Object.keys(user).length > 0 && <Box mb={2}>
                                        <TextField variant='outlined' label="Assigned By" value={`${user.firstname} ${user.lastname}`} readonly required fullWidth />
                                    </Box>
                                }
                                {
                                    users && users !== null && users !== undefined && users !== "" && users.length > 0 && <Box mb={2}>
                                        <InputLabel>Assign To</InputLabel>
                                        <Select name="assignTo" value={task.assignTo} onChange={handleOnChange} required fullWidth>
                                            {
                                                users.map(item => <MenuItem key={item._id} value={item._id}>{item.firstname} {item.lastname}</MenuItem>)
                                            }
                                        </Select>
                                    </Box>
                                }
                                <Box mb={2}>
                                    <InputLabel>Due Date</InputLabel>
                                    <TextField variant='outlined' name='dueDate' type="date" value={task.dueDate} onChange={handleOnChange} inputProps={{
                                        min: new Date().toISOString().split('T')[0]
                                    }} fullWidth />
                                </Box>
                                <Box mb={2}>
                                    <TextField rows={4} variant='outlined' multiline type="text" label="Description" value={task.description} onChange={handleOnChange} fullWidth name="description" />
                                </Box>
                                {/* <Box mb={2}>
                                    <InputLabel>Add Attachment</InputLabel>
                                    <FileBase64 multiple onDone={(e) => setTask({ ...task, attachment: e })} />
                                </Box> */}
                                {
                                    user && user !== null && user !== undefined && user !== "" && Object.keys(user).length > 0 && <Box>
                                        <Button type="submit" className="primary-button" fullWidth>Add Task</Button>
                                    </Box>
                                }
                            </form>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddTaskModal