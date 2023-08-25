import actionTypes from "./actionTypes";

export const handleAddDashColumn = (newList) => async (dispatch) => {
    try {
        const response = await fetch('/api/create-dashboard-column', { method: "POST", body: JSON.stringify(newList) })
        dispatch({ type: actionTypes.ADD_DASHBOARD_COLUMN_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.ADD_DASHBOARD_COLUMN_FAILURE })
    }
}

export const handleGetDashboardColumn = () => async (dispatch) => {
    try {
        const response = await fetch('/api/get-dashboard-column', { method: 'GET' })
        const { column } = await response.json()
        dispatch({ type: actionTypes.GET_DASHBOARD_COLUMN_SUCCESS, payload: column })
    } catch (error) {
        dispatch({ type: actionTypes.GET_DASGBOARD_COLUMN_FAILURE })
    }
}

export const handleDeleteDashboardColumn = (_id) => async (dispatch) => {
    try {
        const response = await fetch('/api/delete-dashboard-column', { method: "POST", body: JSON.stringify({ _id }) })
        dispatch({ type: actionTypes.DELETE_DASHBOARD_COLUMN_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_DASHBOARD_COLUMN_FAILURE })
    }
}

export const handleAddTask = (newTaskData) => async (dispatch) => {
    try {
        const response = await fetch('/api/create-task', { method: "POST", body: JSON.stringify({ newTaskData }) })
        dispatch({ type: actionTypes.CREATE_TASK_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_TASK_FAILURE })
    }
}

export const handleUpdateTaskOrderSameColumn = (updatedColumns) => async (dispatch) => {
    try {
        const response = await fetch('/api/update-task-order-same-colum', { method: "POST", body: JSON.stringify({ updatedColumns }) })
        dispatch({ type: actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_FAILURE })
    }
}

export const handleMoveTaskFromSourceToAnotherDestination = (updatedColumns) => async (dispatch) => {
    try {
        const response = await fetch('/api/update-task-source-and-destination', { method: "POST", body: JSON.stringify({ updatedColumns }) });
        dispatch({ type: actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_FAILURE })
    }
}