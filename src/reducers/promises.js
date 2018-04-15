import {types as actionType} from '../actions/promises'

const initialState = {
    retrieve: {
        loading: false,
        error: null,
        data: null
    },
    create: {
        loading: false,
        error: null
    }
}


const promiseReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.PROMISES_FETCH_REQUEST:
            return {
                ...state,
                retrieve: {
                    ...state.retrieve,
                    loading: true,
                    error: null
                }
            }
        case actionType.PROMISES_FETCH_SUCCESS:
            return {
                ...state,
                retrieve: {
                    ...state.retrieve,
                    loading: false,
                    error: null,
                    data: action.payload
                }
            }
        case actionType.PROMISES_FETCH_FAILURE:
            return {
                ...state,
                retrieve: {
                    ...state.retrieve,
                    loading: false,
                    error: action.payload,
                }
            }
        case actionType.PROMISES_CREATE_REQUEST:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: true,
                    error: false
                }
            }
        case actionType.PROMISES_CREATE_SUCCESS:
            return {
                ...state,
                retrieve:{
                    ...state.retrieve,
                    data: {
                        ...state.retrieve.data,
                        promises_as_inviter: state.retrieve.data.promises_as_inviter.slice().concat([action.payload.promise.id])
                    }
                },
                create: {
                    ...state.create,
                    loading: false,
                    error: false
                }
            }
        case actionType.PROMISES_CREATE_FAILURE:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: false,
                    error: action.payload
                }
            }
        default:
            return state
    }
}

export default promiseReducer
