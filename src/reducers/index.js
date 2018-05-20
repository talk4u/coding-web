import { combineReducers } from 'redux'

import authReducer from './auth'
import gymReducer from './gym'
import problemReducer from './problem.ignore'
import exceptionReducer from "./hadleException";



const appReducer = combineReducers({
    authReducer,
    gymReducer,
    problemReducer,
    exceptionReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
