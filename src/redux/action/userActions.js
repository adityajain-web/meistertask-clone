import actionTypes from "./actionTypes";

export const registerUser = (data) => async (dispatch) => {
    try {
        const response = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            const { message, user } = await response.json();
            dispatch({ type: actionTypes.REGISTER_USER, payload: { message, user } });
            return;
        } else if (response.status === 400) {
            const { message } = await response.json();
            dispatch({ type: actionTypes.REGISTER_USER_FAILURE, payload: { message, user: null } });
            return;
        }

    } catch (error) {
        dispatch({ type: actionTypes.REGISTER_USER_FAILURE, payload: error });
    }
}

export const handleUserLogin = (data) => async (dispatch) => {
    try {
        const response = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify(data)
        })
        const { message, user } = await response.json();
        dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: { message, user } })
    } catch (error) {
        dispatch({ type: actionTypes.USER_LOGIN_FAILURE, payload: { message: "login failed", user: null } })
    }
}

export const handleUserLogout = () => async (dispatch) => {
    try {
        await fetch('/api/logout')
        dispatch({ type: actionTypes.USER_LOGOUT_SUCCESS, payload: { message: "Logout successfully." } })
    } catch (error) {
        dispatch({ type: actionTypes.USER_LOGOUT_FAILURE, payload: { message: 'Logout failed.' } })
    }
}

export const handleGetDataFromToken = (token) => async (dispatch) => {
    try {
        const response = await fetch('/api/get-token-data', { method: "POST", body: JSON.stringify(token) })
        const decodedToken = await response.json()
        dispatch({ type: actionTypes.GET_AUTH_TOKEN_DATA_SUCCESS, payload: decodedToken })
    } catch (error) {
        dispatch({ type: actionTypes.GET_AUTH_TOKEN_DATA_FAILURE, payload: { message: "Failed to fetch data." } })
    }
}

export const handleGetUserData = (id) => async (dispatch) => {
    try {
        const response = await fetch('/api/get-user', { method: "POST", body: JSON.stringify(id) })
        const { user } = await response.json();
        dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: user })
    } catch (error) {
        dispatch({ type: actionTypes.GET_USER_FAILURE })
    }
}

export const handleFetchAllUsers = () => async (dispatch) => {
    try {
        const response = await fetch('/api/get-users')
        const { users } = await response.json()
        dispatch({ type: actionTypes.GET_USERS_SUCCESS, payload: users })
    } catch (error) {
        dispatch({ type: actionTypes.GET_USERS_FAILURE })
    }
}