import actionTypes from "./actionTypes";

export const handleAddDashColumn = (listName) => async (dispatch) => {
    try {
        const response = await fetch('/api/create-dashboard-column', { method: "POST", body: JSON.stringify({ listName }) })
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