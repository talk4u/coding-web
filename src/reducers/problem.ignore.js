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
                retrieve: {
                    ...state.retrieve,
                    loading: true,
                    error: null
                }
            }
        case actionType.BODY_FETCH_SUCCESS:
            return {
                ...state,
                retrieve: {
                    ...state.retrieve,
                    loading: false,
                    error: null,
                    data: action.payload
                }
            }
        case actionType.BODY_FETCH_FAILURE:
            return {
                ...state,
                retrieve: {
                    ...state.retrieve,
                    loading: false,
                    error: action.payload,
                }
            }

        default:
            return state
    }
}

export default problemReducer
