import {types as actionType} from '../actions/auth'

const initialState = {
    isAuthenticated: false,
    loading: false,
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
                isAuthenticated: true,
                token: action.payload.token,
                redirectToReferrer: true,
                error: null
            }
        case actionType.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
                token: null,
                redirectToReferrer: true
            }
        case actionType.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                redirectToReferrer: false,
                error: null
            }
        case actionType.UNAUTHORIZED:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                redirectToReferrer: false
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
