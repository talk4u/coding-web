import {types as actionType} from '../actions/gym'

export const initialState = {
    list: {
        loading: false,
        error: null,
        data: null
    },
    detail: {
        loading: false,
        error: null,
        data: null
    },
}


const gymReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.LIST_FETCH_REQUEST:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                    error: null
                }
            }
        case actionType.LIST_FETCH_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    error: null,
                    data: action.payload
                }
            }
        case actionType.LIST_FETCH_FAILURE:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    error: action.payload,
                }
            }
        case actionType.DETAIL_FETCH_REQUEST:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    error: null
                }
            }
        case actionType.DETAIL_FETCH_SUCCESS:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    error: null,
                    data: action.payload
                }
            }
        case actionType.DETAIL_FETCH_FAILURE:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    error: action.payload,
                }
            }

        default:
            return state
    }
}

export default gymReducer
