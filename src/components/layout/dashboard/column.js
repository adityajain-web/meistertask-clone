import { Add, Circle } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const Column = ({ title, color, taskCount, listId, tasks, handleOpenAddTaskModal }) => {
    return (
        <>
            <Card className='shadow-none border dashboard-column'>
                <CardContent sx={{ height: "100%" }}>
                    <Box>
                        <Box className="d-flex justify-content-between align-items-center">
                            <Typography variant='h4' gutterBottom>{title || 'List'}</Typography>
                            <Chip style={{ backgroundColor: color }} label={<strong>{taskCount}</strong>} />
                        </Box>
                        <Divider className='bg--primary' />
                        <Box mt={2}>
                            <Droppable droppableId={listId.toString()} type="TASK">
                                {(provided) => (
                                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                                        {tasks && tasks !== null && tasks !== undefined && tasks.length > 0 && tasks.map((t, index) => (
                                            <Draggable key={t._id} draggableId={t._id} index={index}>
                                                {(provided) => (
                                                    <Box
                                                        mb={2}
                                                        p={2}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        component={Paper}
                                                        className='shadow'
                                                    >
                                                        <Typography variant='h5'>{t.taskName}</Typography>
                                                    </Box>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                            <Box mt={2}>
                                <Button variant='contained' className='btn btn-light' onClick={() => handleOpenAddTaskModal(true, listId)}><Add className='me-3' /> Add More Task</Button>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default Column