import actionTypes from "./actionTypes";

export const handleAddDashColumn = (listName) => async (dispatch) => {
    try {
        const response = await fetch('/api/create-dashboard-column', { method: "POST", body: JSON.stringify({ listName }) })
        dispatch({ type: actionTypes.ADD_DASHBOARD_COLUMN_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.ADD_DASHBOARD_COLUMN_FAILURE })
    }
}