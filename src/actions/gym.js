export const types = {
    LIST_FETCH_REQUEST: "GYM/LIST/FETCH/REQUEST",
    LIST_FETCH_SUCCESS: "GYM/LIST/FETCH/SUCCESS",
    LIST_FETCH_FAILURE: "GYM/LIST/FETCH/FAILURE",
    DETAIL_FETCH_REQUEST: "GYM/DETAIL/FETCH/REQUEST",
    DETAIL_FETCH_SUCCESS: "GYM/DETAIL/FETCH/SUCCESS",
    DETAIL_FETCH_FAILURE: "GYM/DETAIL/FETCH/FAILURE",
}

export const gymListFetchRequested = () => {
    return {
        type: types.LIST_FETCH_REQUEST,
    }
}

export const gymListFetchSuccess = (gymList) => {
    return {
        type: types.LIST_FETCH_SUCCESS,
        payload: gymList
    }
}

export const gymListFetchFail = (error) => {
    return {
        type: types.LIST_FETCH_FAILURE,
        payload: error
    }
}

export const gymDetailFetchRequested = () => {
    return {
        type: types.DETAIL_FETCH_REQUEST,
    }
}

export const gymDetailFetchSuccess = (gym) => {
    return {
        type: types.DETAIL_FETCH_SUCCESS,
        payload: gym
    }
}

export const gymDetailFetchFail = (error) => {
    return {
        type: types.DETAIL_FETCH_FAILURE,
        payload: error
    }
}


