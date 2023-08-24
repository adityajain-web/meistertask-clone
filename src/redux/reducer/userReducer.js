import actionTypes from "../action/actionTypes";

const initialValue = {
    users: null,
    user: null,
    message: '',
    error: false
}

export const userReducer = (state = initialValue, { type, payload }) => {
    switch (type) {
        case actionTypes.REGISTER_USER:
            return { ...state, user: payload.user, message: payload.message, error: false };

        case actionTypes.REGISTER_USER_FAILURE:
            return { ...state, user: null, message: payload.message, error: true };

        case actionTypes.USER_LOGIN_SUCCESS:
            return { ...state, user: payload.user, message: payload.message, error: false };

        case actionTypes.USER_LOGIN_FAILURE:
            return { ...state, user: null, message: payload.message, error: true }

        case actionTypes.USER_LOGOUT_SUCCESS:
            return { ...state, user: null, message: payload.message, error: false }

        case actionTypes.USER_LOGOUT_FAILURE:
            return { ...state, user: null, message: payload.message, error: true }

        case actionTypes.GET_USER_SUCCESS:
            return { ...state, user: payload, message: 'success', error: false }

        case actionTypes.GET_USER_FAILURE:
            return { ...state, user: null, message: "Failed to fetch user data.", error: true }

        case actionTypes.GET_USERS_SUCCESS:
            return { ...state, users: payload, message: "success", error: false }

        case actionTypes.GET_USERS_FAILURE:
            return { ...state, users: null, message: "Failed to fetch users", error: true }

        default:
            return state;
    }
}