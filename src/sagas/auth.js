import { delay } from 'redux-saga'
import { all, call, fork, put, take, cancel, cancelled, takeLatest } from 'redux-saga/effects'
import { types as actionType, loginFail, loginSuccess, loginRequested } from '../actions/auth'
import Api from '../config/Api'

function* authorize(username, password) {
    try {
        // const token = yield call(Api.authorize, username, password)
        const token = yield {token:'123'}
        yield call(Api.storeItem, {token, username})
        yield put(loginSuccess(token))
        return token
    } catch (error) {
        yield put(loginFail(error))
    } finally {
        if (yield cancelled()) {
            //...
        }
    }
}

function* verify({username, token:oldToken}) {
    try {
        // const token = yield call(Api.verify, oldToken)
        const token = yield {token:'123'}
        yield call(Api.storeItem, {token, username})
        yield put(loginSuccess(token))
        return token
    } catch (error) {
        yield put(loginFail(error))
        yield call(Api.clearItem, 'token')
        yield call(Api.clearItem, 'username')
    } finally {
        if (yield cancelled()) {
            //...
        }
    }
}

function* acceptAuthReq() {
    try {
        const action = yield take([actionType.LOGIN_REQUEST, actionType.AUTH_VERIFY])

        if(action.type == actionType.LOGIN_REQUEST){
            const {payload:{username, password}} = action
            if(!username.length || !password.length){
                throw("Username or Password required")
            }
            yield fork(authorize, username, password)
        } else {
            const {payload} = action
            yield fork(verify, payload)
        }
    } catch (error) {
        yield put(loginFail(error))
        yield call(Api.clearItem, 'token')
        yield call(Api.clearItem, 'username')
    } finally {
        if (yield cancelled()){
            //...
        }
    }
}


export function* loginFlow() {
    while(true){
        const task = yield fork(acceptAuthReq)
        const action = yield take([actionType.LOGOUT, actionType.LOGIN_FAILURE])
        if (action.type == actionType.LOGOUT) {
            yield cancel(task)
        }
        yield call(Api.clearItem, 'token')
        yield call(Api.clearItem, 'username')
    }

}
