export const types = {
    FETCH_REQUEST: "USER/FETCH_REQUEST",
    FETCH_SUCCESS: "USER/FETCH_SUCCESS",
    FETCH_FAILURE: "USER/FETCH_FAILURE",
}

export const usersFetchRequested = () => {
    return {
        type: types.FETCH_REQUEST,
    }
}

export const usersFetchSuccess = (users) => {
    return {
        type: types.FETCH_SUCCESS,
        payload: users
    }
}

export const usersFetchFail = (error) => {
    return {
        type: types.FETCH_FAILURE,
        payload: {
            error
        }
    }
}
