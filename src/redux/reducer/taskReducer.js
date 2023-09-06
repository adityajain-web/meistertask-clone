import actionTypes from "../action/actionTypes";

const initialState = {
    assignBy: null,
    assignTo: null,
    error: false,
    message: ""
}

export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GET_TASK_ASSIGNED_BY_USER_SUCCESS:
            return { ...state, assignBy: payload, error: false }

        case actionTypes.GET_TASK_ASSIGNED_BY_USER_FAILURE:
            return { ...state, assignBy: null, error: true }

        case actionTypes.GET_TASK_ASSIGNED_TO_USER_SUCCESS:
            return { ...state, assignTo: payload, error: false }

        case actionTypes.GET_TASK_ASSIGNED_TO_USER_FAILURE:
            return { ...state, assignTo: null, error: true }

        case actionTypes.DELETE_MAIN_TASK_SUCCESS:
            return { ...state, message: "success", error: false }

        case actionTypes.DELETE_MAIN_TASK_FAILURE:
            return { ...state, message: "failed", error: true }

        case actionTypes.ADD_SUBTASK_SUCCESS:
            return { ...state, message: "subtask add success", error: false }

        case actionTypes.ADD_SUBTASK_FAILURE:
            return { ...state, message: "subtask add failed", error: true }

        case actionTypes.UPDATE_SUBTASK_SUCCESS:
            return { ...state, message: "subtask update success", error: false }

        case actionTypes.UPDATE_SUBTASK_FAILURE:
            return { ...state, message: "subtask update failed", error: true }

        default:
            return state
    }
}