import { CreateSubTask, UpdateStatusOfSubTask, getTaskAssignedByUSer, getTaskAssignedToUSer } from '@/redux/action/taskAction'
import { Add, Close, Delete } from '@mui/icons-material'
import { Box, Button, Checkbox, Dialog, DialogContent, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const TaskDetailModal = ({ openTaskDetailModal, taskDetails, handleOpenTaskDetailModal, handleDeleteTask, FetchColumnOnTaskAddSuccess }) => {
    const [subTask, setSubTask] = useState("")
    const [showAddSubtTaskForm, setShowAddSubTaskForm] = useState(false)
    const [subtaskStatus, setSubtaskStatus] = useState([]);
    const dispatch = useDispatch()
    const { assignBy, assignTo, message, error } = useSelector(state => state.taskReducer)

    const getUser = () => {
        if (taskDetails && taskDetails.task && taskDetails.task.assignBy && taskDetails.task.assignTo) {
            dispatch(getTaskAssignedByUSer(taskDetails.task.assignBy))
            dispatch(getTaskAssignedToUSer(taskDetails.task.assignTo))
        }
    }

    useEffect(() => {
        if (taskDetails && taskDetails.task && taskDetails.task.assignBy && taskDetails.task.assignTo) {
            getUser()
        }
    }, [taskDetails && taskDetails.task && taskDetails.task._id && taskDetails.task._id])

    const handleAddSubTask = (e) => {
        e.preventDefault()
        if (taskDetails && taskDetails.listId && taskDetails.task) {
            const { listId } = taskDetails;
            const { _id: taskId } = taskDetails.task
            const newSubTask = { task: subTask, done: false }
            dispatch(CreateSubTask(listId, taskId, newSubTask))
        }
    }

    useEffect(() => {
        if (message === "subtask add success" && !error) {
            setShowAddSubTaskForm(false)
            toast.success('Subtask added successfully.')
        } else if (message === "subtask add failed" && error) {
            setShowAddSubTaskForm(false)
            toast.error('Failed to add subtask.')
        }
    }, [message, error])

    useEffect(() => {
        if (
            taskDetails &&
            taskDetails.task &&
            taskDetails.task.subtasks &&
            taskDetails.task.subtasks.length > 0
        ) {
            setSubtaskStatus(taskDetails.task.subtasks.map((item) => item.done));
        }
    }, [taskDetails]);

    const handleStatusChange = (listId, taskId, subId) => {
        dispatch(UpdateStatusOfSubTask(listId, taskId, subId))
    }

    const handleSubtaskCheckboxChange = (index, listId, taskId, subId) => {
        const updatedStatus = [...subtaskStatus];
        updatedStatus[index] = !updatedStatus[index];
        setSubtaskStatus(updatedStatus);
        handleStatusChange(listId, taskId, subId,)
    };

    return (
        <>
            <Dialog maxWidth="xs" fullWidth open={openTaskDetailModal}>
                <DialogContent>
                    {
                        taskDetails && taskDetails !== null && taskDetails !== undefined && taskDetails !== "" && Object.keys(taskDetails).length > 0 &&
                        <>
                            {
                                taskDetails.task && taskDetails.task !== null && taskDetails.task !== undefined && taskDetails.task !== "" && Object.keys(taskDetails.task).length > 0 && <>
                                    <Box>
                                        <Box className="d-flex justify-content-end align-items-center">
                                            <IconButton onClick={() => handleOpenTaskDetailModal(false)}>
                                                <Close />
                                            </IconButton>
                                        </Box>
                                        <Box>
                                            <Typography variant='h4' gutterBottom>{taskDetails.task.taskName && taskDetails.task.taskName}</Typography>
                                            <Box mt={2}>
                                                <TextField variant='outlined' label="Task Description" multiline maxRows={20} value={taskDetails.task.description && taskDetails.task.description} fullWidth />
                                            </Box>
                                            <Box mt={2} className="table-responsive">
                                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                                    <tr>
                                                        <th className='table--border'>Assigned By:</th>
                                                        <td className='table--border'>{assignBy && assignBy.firstname} {assignBy && assignBy.lastname}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='table--border'>Assigned To:</th>
                                                        <td className='table--border'>{assignTo && assignTo.firstname} {assignTo && assignTo.lastname}</td>
                                                    </tr>
                                                </table>
                                            </Box>
                                            <Box mt={2}>
                                                {
                                                    taskDetails && taskDetails.task && Object.keys(taskDetails.task).length > 0 && taskDetails.task.subtasks && taskDetails.task.subtasks !== null && taskDetails.task.subtasks !== undefined && taskDetails.task.subtasks !== "" && taskDetails.task.subtasks.length > 0 && <Box mb={2}>
                                                        <Typography variant='h5' gutterBottom>Sub Tasks</Typography>
                                                        {
                                                            taskDetails.task.subtasks.map((item, index) => <Box>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={10}>
                                                                        {console.log(subtaskStatus[index], index)}
                                                                        <FormControlLabel control={<Checkbox checked={subtaskStatus[index]} onChange={() => handleSubtaskCheckboxChange(index, taskDetails.listId, taskDetails.task._id, item._id)} />} label={item.done ? <del>{item.task}</del> : item.task} />

                                                                    </Grid>
                                                                    <Grid item xs={2}>
                                                                        <IconButton><Delete /></IconButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>)
                                                        }
                                                    </Box>
                                                }
                                                {
                                                    showAddSubtTaskForm && <>
                                                        <Box>
                                                            <form onSubmit={handleAddSubTask}>
                                                                <TextField type="text" variant='outlined' label="Add Sub Task" value={subTask} fullWidth onChange={(e) => setSubTask(e.target.value)} required />
                                                                <Box mt={2}>
                                                                    <Button type="submit" className='primary-button'>Add</Button>
                                                                </Box>
                                                            </form>
                                                        </Box>
                                                    </>
                                                }
                                                {
                                                    !showAddSubtTaskForm && <Button className='btn' onClick={() => setShowAddSubTaskForm(true)}><Add className='me-3' /> ADD SUBTASK</Button>
                                                }
                                            </Box>
                                            {assignBy && assignTo && taskDetails && taskDetails.loggedUser && <>
                                                {
                                                    (assignBy._id == taskDetails.loggedUser._id) || (assignTo._id == taskDetails.loggedUser._id) || (taskDetails.loggedUser.isAdmin) ? <Box mt={2}>
                                                        <Button className='btn btn-danger me-3' onClick={() => handleDeleteTask(taskDetails && taskDetails.listId && taskDetails.listId, taskDetails.task._id)}>Delete Task</Button>
                                                        <Button className='btn btn-warning'>Edit Task</Button>
                                                    </Box> : null
                                                }
                                            </>}
                                        </Box>
                                    </Box>
                                </>
                            }
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TaskDetailModal