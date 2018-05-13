import { combineReducers } from 'redux'

import authReducer from './auth'
import gymReducer from './gym'
import problemReducer from './problem.ignore'



const appReducer = combineReducers({
    authReducer,
    gymReducer,
    problemReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
