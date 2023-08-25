import actionTypes from "../action/actionTypes";

const initialState = {
    columns: null,
    message: "",
    error: false
}

export const dashboardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.ADD_DASHBOARD_COLUMN_SUCCESS:
            return { ...state, message: "added successfully", error: false }

        case actionTypes.ADD_DASHBOARD_COLUMN_FAILURE:
            return ({ ...state, message: "failed to add", error: true })

        case actionTypes.GET_DASHBOARD_COLUMN_SUCCESS:
            return { ...state, columns: payload, message: "success", error: false }

        case actionTypes.GET_DASGBOARD_COLUMN_FAILURE:
            return { ...state, message: "failed", error: true }

        case actionTypes.DELETE_DASHBOARD_COLUMN_SUCCESS:
            return { ...state, message: "delete success", error: false }

        case actionTypes.DELETE_DASHBOARD_COLUMN_FAILURE:
            return { ...state, message: "delete failed", error: true }

        case actionTypes.CREATE_TASK_SUCCESS:
            return { ...state, message: "task added suucessfully", error: false }

        case actionTypes.CREATE_TASK_FAILURE:
            return { ...state, message: "failed to add task.", error: true }

        case actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_SUCCESS:
            return { ...state, message: "task order is updated", error: false }

        case actionTypes.UPDATE_TASK_ORDER_SAME_COLUMN_FAILURE:
            return { ...state, message: "failed to update task order" }

        case actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_SUCCESS:
            return { ...state, message: "Task updated successfully.", error: false }

        case actionTypes.UPDATE_TASK_FROM_SOURCE_TO_DESTINATION_FAILURE:
            return { ...state, message: "Failed to update task.", error: true }

        default:
            return state
    }
}