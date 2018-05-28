import {types as actionType} from '../actions/problem.ignore'

const initialState = {
    body: {
        loading: false,
        error: null,
        data: null
    },
    history: {
        loading: false,
        error: null,
        data: null
    },
    rank: {
        loading: false,
        error: null,
        data: null
    },
}


const problemReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.BODY_FETCH_REQUEST:
            return {
                ...state,
                body: {
                    ...state.body,
                    loading: true,
                    error: null
                }
            }
        case actionType.BODY_FETCH_SUCCESS:
            return {
                ...state,
                body: {
                    ...state.body,
                    loading: false,
                    error: null,
                    data: action.payload
                }
            }
        case actionType.BODY_FETCH_FAILURE:
            return {
                ...state,
                body: {
                    ...state.body,
                    loading: false,
                    error: action.payload,
                }
            }

        default:
            return state
    }
}

export default problemReducer
