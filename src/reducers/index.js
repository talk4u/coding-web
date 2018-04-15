import { combineReducers } from 'redux'

import authReducer from './auth'
import userReducer from './user'
import promiseReducer from './promises'



const appReducer = combineReducers({
    authReducer,
    userReducer,
    promiseReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
