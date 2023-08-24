// src\components\layout\dashboard\board.js

import { handleGetDashboardColumn } from '@/redux/action/dashboardAction'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Column from './column'
import { AddTaskModal } from '@/components'
import { DragDropContext } from 'react-beautiful-dnd'

const Board = () => {
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [openTaskModalListId, setOpenTaskModalListId] = useState("")
    const dispatch = useDispatch()
    const { columns } = useSelector(state => state.dashboardReducer)

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

        if (!destination) {
            return;
        }

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
        updatedColumns[destColIndex].tasks.splice(destination.index, 0, task);

        console.log(updatedColumns)

        // Update your state with updatedColumns
        // setState or update your data source here
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
        </>
    )
}

export default Board
