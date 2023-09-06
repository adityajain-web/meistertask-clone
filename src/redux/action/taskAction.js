import actionTypes from "./actionTypes"

export const getTaskAssignedByUSer = (_id) => async (dispatch) => {
    try {
        const response = await fetch('/api/get-user', { method: "POST", body: JSON.stringify(_id) })
        const { user } = await response.json()
        dispatch({ type: actionTypes.GET_TASK_ASSIGNED_BY_USER_SUCCESS, payload: user })
    } catch (error) {
        dispatch({ type: actionTypes.GET_TASK_ASSIGNED_BY_USER_FAILURE })
    }
}

export const getTaskAssignedToUSer = (_id) => async (dispatch) => {
    try {
        const response = await fetch('/api/get-user', { method: "POST", body: JSON.stringify(_id) })
        const { user } = await response.json()
        dispatch({ type: actionTypes.GET_TASK_ASSIGNED_TO_USER_SUCCESS, payload: user })
    } catch (error) {
        dispatch({ type: actionTypes.GET_TASK_ASSIGNED_TO_USER_FAILURE })
    }
}

export const DeleteMainTask = (listId, taskId) => async (dispatch) => {
    try {
        const response = await fetch('/api/delete-main-task', { method: 'POST', body: JSON.stringify({ listId, taskId }) })
        dispatch({ type: actionTypes.DELETE_MAIN_TASK_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_MAIN_TASK_FAILURE })
    }
}

export const CreateSubTask = (listId, taskId, subTask) => async (dispatch) => {
    try {
        const response = await fetch('/api/create-subtask', { method: "POST", body: JSON.stringify({ listId, taskId, subTask }) })
        dispatch({ type: actionTypes.ADD_SUBTASK_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.ADD_SUBTASK_FAILURE })
    }
}

export const UpdateStatusOfSubTask = (listId, taskId, subId) => async (dispatch) => {
    try {
        const response = await fetch('/api/update-subtask', { method: 'POST', body: JSON.stringify({ listId, taskId, subId }) })
        dispatch({ type: actionTypes.UPDATE_SUBTASK_SUCCESS })
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_SUBTASK_FAILURE })
    }
}