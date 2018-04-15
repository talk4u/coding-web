import {types as actionType} from '../actions/user'

const initialState = {
    loading: false,
    error: null,
    list: []
}


const userReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionType.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                list: action.payload
            }
        case actionType.FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer
