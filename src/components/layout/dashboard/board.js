import { handleGetDashboardColumn, handleMoveTaskFromSourceToAnotherDestination, handleUpdateTaskOrderSameColumn } from '@/redux/action/dashboardAction'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Column from './column'
import { AddTaskModal, TaskDetailModal } from '@/components'
import { DragDropContext } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'

const Board = () => {
    const [openTaskDetailModal, setOpenTaskDetailModal] = useState(false)
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openTaskModalListId, setOpenTaskModalListId] = useState("")
    const dispatch = useDispatch()
    const { columns, message, error } = useSelector(state => state.dashboardReducer)

    useEffect(() => {
        dispatch(handleGetDashboardColumn())
    }, [])

    const handleOpenAddTaskModal = (o, listId) => {
        setOpenAddTaskModal(o)
        setOpenTaskModalListId(listId)
    }

    const FetchColumnOnTaskAddSuccess = () => {
        dispatch(handleGetDashboardColumn())
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // Condition 1: Drag and drop to unknown destination
        if (!destination) {
            return;
        }

        // Condition 2: Drag and drop to the same column and same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const updatedColumns = [...columns];

        const sourceColIndex = updatedColumns.findIndex(
            col => col._id === source.droppableId
        );

        const destColIndex = updatedColumns.findIndex(
            col => col._id === destination.droppableId
        );

        const task = updatedColumns[sourceColIndex].tasks.splice(source.index, 1)[0];

        // Condition 4: Drag and drop item from different source and different destination
        if (destination.droppableId !== source.droppableId) {
            // Add the task to the destination column's tasks
            updatedColumns[destColIndex].tasks.splice(destination.index, 0, task);

            // Dispatch an action to move the task from the source column to the destination column
            dispatch(handleMoveTaskFromSourceToAnotherDestination(updatedColumns))
        } else {
            // Condition 3: Drag and drop item in the same column but different location
            // Add the task to the same column's tasks at the new position
            updatedColumns[destColIndex].tasks.splice(destination.index, 0, task);

            // Dispatch an action to update the task order within the same column
            dispatch(handleUpdateTaskOrderSameColumn(updatedColumns))
        }

        // Here, you should dispatch an action to update Redux state and
        // make an API call to update the backend data
    }


    useEffect(() => {
        if (message === "task order is updated" && !error) {
            toast.success('Task Order is updated')
            dispatch(handleGetDashboardColumn())
        } else if (message === "failed to update task order" && error) {
            toast.error('Failed to update task order.')
        }
    }, [message, error])

    useEffect(() => {
        if (message === "Task updated successfully." && !error) {
            toast.success('Task status updated successfully.')
            dispatch(handleGetDashboardColumn())
        } else if (message === "Failed to update task." && error) {
            toast.error('Failed to update task status.')
        }
    }, [message, error])

    const handleOpenTaskDetailModal = (s, listId, taskId) => {
        setOpenTaskDetailModal(s)
    }


    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box p={2} className="dashboard-board">
                    {columns && columns !== null && columns !== undefined && columns !== "" && columns.length > 0 && columns.map(item => (
                        <Column
                            key={item._id}
                            title={item.listName}
                            color={item.listColor}
                            taskCount={item.tasks.length}
                            handleOpenAddTaskModal={handleOpenAddTaskModal}
                            handleOpenTaskDetailModal={handleOpenTaskDetailModal}
                            listId={item._id}
                            tasks={item.tasks || []}
                        />
                    ))}
                </Box>
            </DragDropContext>
            <AddTaskModal
                openAddTaskModal={openAddTaskModal}
                openTaskModalListId={openTaskModalListId}
                FetchColumnOnTaskAddSuccess={FetchColumnOnTaskAddSuccess}
                handleOpenAddTaskModal={handleOpenAddTaskModal}
            />
            <TaskDetailModal
                handleOpenTaskDetailModal={handleOpenTaskDetailModal}
                openTaskDetailModal={openTaskDetailModal}
            />
        </>
    )
}

export default Board
