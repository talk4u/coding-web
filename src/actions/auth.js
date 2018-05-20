export const types = {
    LOGIN_REQUEST: "AUTH/LOGIN_REQUEST",
    LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
    LOGIN_FAILURE: "AUTH/LOGIN_FAILURE",
    LOGOUT: "AUTH/LOGOUT",
    UNAUTHORIZED: "AUTH/UNAUTHORIZED",
    AUTH_VERIFY: "AUTH/VERIFY",
}

export const loginRequested = ({username, password}) => {
    return {
        type: types.LOGIN_REQUEST,
        payload: {
            username,
            password
        }
    }
}

export const loginSuccess = (token) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            token,
        }
    }
}

export const loginFail = (error) => {
    return {
        type: types.LOGIN_FAILURE,
        payload: {
            error
        }
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export const authVerify = (username, token) => {
    return {
        type: types.AUTH_VERIFY,
        payload: {
            token,
            username
        }
    }
}

export const unauthorized = (requestStack) => {
    return {
        type: types.UNAUTHORIZED,
        payload: {
            requestStack
        }
    }
}