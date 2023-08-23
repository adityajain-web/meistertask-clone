import { handleGetDashboardColumn } from '@/redux/action/dashboardAction'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Column from './column'

const Board = () => {
    const dispatch = useDispatch()
    const { columns } = useSelector(state => state.dashboardReducer)

    useEffect(() => {
        dispatch(handleGetDashboardColumn())
    }, [columns])

    return (
        <>
            <Box p={2} className="dashboard-board">
                {
                    columns && columns !== null && columns !== undefined && columns !== "" && columns.length > 0 && columns.map(item => <Column key={item._id} title={item.listName} />)
                }
            </Box>
        </>
    )
}

export default Board