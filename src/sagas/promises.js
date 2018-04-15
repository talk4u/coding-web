import {
    types as actionType,
    promisesFetchRequested,
    promisesFetchSuccess,
    promisesFetchFail,
    promisesCreateSuccess,
    promisesCreateFail
} from "../actions/promises";
import {put, takeLatest, call, takeEvery} from "redux-saga/effects";
import Api from '../config/Api'

export function* fetchPromiseAsync({payload: {user1}}) {
    try{
        const promises = yield call(()=>Api.fetchApi(`/users/${user1}`))
        yield put(promisesFetchSuccess(promises))
    } catch (error) {
        yield put(promisesFetchFail(error))
    }
}

export function* watchFetchPromiseAsync() {
    yield takeLatest(actionType.PROMISES_FETCH_REQUEST, fetchPromiseAsync)
}



export function* createPromiseAsync({payload:{sinceWhen, tilWhen, user1, user2}}) {
    try{
        const promise = yield call(()=>Api.fetchApi('/promises/', {sinceWhen, tilWhen, user2}, 'post'))
        yield put(promisesCreateSuccess({user1, promise}))
    } catch (error) {
        yield put(promisesCreateFail(error))
    }
}

export function* watchCreatePromiseAsync() {
    yield takeEvery(actionType.PROMISES_CREATE_REQUEST, createPromiseAsync)
}
