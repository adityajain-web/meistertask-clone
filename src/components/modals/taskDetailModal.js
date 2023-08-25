import { Dialog, DialogContent } from '@mui/material'
import React from 'react'

const TaskDetailModal = ({ openTaskDetailModal }) => {
    return (
        <>
            <Dialog maxWidth="xs" fullWidth open={openTaskDetailModal}>
                <DialogContent></DialogContent>
            </Dialog>
        </>
    )
}

export default TaskDetailModal