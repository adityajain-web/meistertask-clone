import actionTypes from "../action/actionTypes";

const initialState = {
    columns: null,
    message: "",
    error: false
}

export const dashboardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.ADD_DASHBOARD_COLUMN_SUCCESS:
            return { ...state, message: "Added succesfully.", error: false }

        case actionTypes.ADD_DASHBOARD_COLUMN_FAILURE:
            return ({ ...state, message: "Failed to add.", error: true })

        default:
            return state
    }
}