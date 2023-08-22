import actionTypes from "../action/actionTypes";

const initialData = {
    decodedToken: null,
    message: "",
    error: false
}

export const authTokenReducer = (state = initialData, { type, payload }) => {
    switch (type) {
        case actionTypes.GET_AUTH_TOKEN_DATA_SUCCESS:
            return { ...state, decodedToken: payload, message: "success", error: false };

        case actionTypes.GET_AUTH_TOKEN_DATA_FAILURE:
            return { ...state, decodedToken: null, message: payload.message, error: true };

        default:
            return state
    }
}