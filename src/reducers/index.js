import { combineReducers } from 'redux'

import authReducer from './auth'
import userReducer from './user'
import gymReducer from './gym'
import problemReducer from './problem'



const appReducer = combineReducers({
    authReducer,
    userReducer,
    gymReducer,
    problemReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
