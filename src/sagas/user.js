import { delay } from 'redux-saga'
import { all, call, fork, put, take, cancel, cancelled, takeLatest } from 'redux-saga/effects'
import {types as actionType, usersFetchSuccess, usersFetchFail} from '../actions/user'
import Api from '../config/Api'



function* fetchUsersAsync() {
    try{
        const users = yield call(()=>Api.fetchApi(`/users/`))
        yield put(usersFetchSuccess(users))
    } catch (error) {
        yield put(usersFetchFail(error))
    }
}

export function* watchFetchUserAsync() {
    yield takeLatest(actionType.FETCH_REQUEST, fetchUsersAsync)
}
