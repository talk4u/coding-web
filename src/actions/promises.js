export const types = {
    PROMISES_FETCH_REQUEST: "PROMISES/FETCH/REQUEST",
    PROMISES_FETCH_SUCCESS: "PROMISES/FETCH/SUCCESS",
    PROMISES_FETCH_FAILURE: "PROMISES/FETCH/FAILURE",
    PROMISES_CREATE_REQUEST: "PROMISES/CREATE/REQUEST",
    PROMISES_CREATE_SUCCESS: "PROMISES/CREATE/SUCCESS",
    PROMISES_CREATE_FAILURE: "PROMISES/CREATE/FAILURE",
}

export const promisesFetchRequested = ({user1}) => {
    return {
        type: types.PROMISES_FETCH_REQUEST,
        payload:{
            user1
        }
    }
}

export const promisesFetchSuccess = (promisesList) => {
    return {
        type: types.PROMISES_FETCH_SUCCESS,
        payload: promisesList
    }
}

export const promisesFetchFail = (error) => {
    return {
        type: types.PROMISES_FETCH_FAILURE,
        payload: error
    }
}


export const promisesCreateRequested = ({sinceWhen, tilWhen, user1, user2}) => {
    return {
        type: types.PROMISES_CREATE_REQUEST,
        payload:{
            sinceWhen,
            tilWhen,
            user1,
            user2
        }
    }
}

export const promisesCreateSuccess = (promise) => {
    return {
        type: types.PROMISES_CREATE_SUCCESS,
        payload: promise
    }
}

export const promisesCreateFail = (error) => {
    return {
        type: types.PROMISES_CREATE_FAILURE,
        payload: error
    }
}
