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

        default:
            return state
    }
}