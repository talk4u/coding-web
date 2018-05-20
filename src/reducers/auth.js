import {types as actionType} from '../actions/auth'

const initialState = {
    isAuthenticated: false,
    loading: true, //pending
    token: null,
    redirectToReferrer: false,
    error: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.payload.token,
                redirectToReferrer: true,
                error: null
            }
        case actionType.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                token: null,
                redirectToReferrer: true
            }
        case actionType.LOGOUT:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                redirectToReferrer: false,
                error: null
            }
        case actionType.UNAUTHORIZED:
            return {
                ...state,
                loading: false,
                token: null,
                redirectToReferrer: false,
                error: null
            }
        case actionType.AUTH_VERIFY:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default authReducer
