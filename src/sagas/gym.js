import { delay } from 'redux-saga'
import { all, call, fork, put, take, takeEvery, cancel, cancelled, takeLatest } from 'redux-saga/effects'
import {types as actionType, gymListFetchSuccess, gymListFetchFail, gymDetailFetchSuccess, gymDetailFetchFail} from '../actions/gym'
import Api from '../config/Api'
import handleException from "../actions/handleException";



function* fetchGymListAsync() {
    try{
        const gym = yield call(Api.gym.list)
        yield put(gymListFetchSuccess(gym))
    } catch (error) {
        if(error.status===401){
            yield put(handleException["401"](fetchGymListAsync))
        }
        yield put(gymListFetchFail(error))
    }
}

function* fetchGymDetailAsync(action) {
    try{

        const gym = yield call(Api.gym.detail, action.payload)
        yield put(gymDetailFetchSuccess(gym))
    } catch (error) {
        if(error.status===401){
            yield put(handleException["401"](fetchGymDetailAsync.bind(null, action)))
        }
        yield put(gymDetailFetchFail(error))
    }
}


export function* watchFetchGymListAsync() {
    yield takeLatest(actionType.LIST_FETCH_REQUEST, fetchGymListAsync)
}

export function* watchFetchGymDetailAsync() {
    yield takeLatest(actionType.DETAIL_FETCH_REQUEST, fetchGymDetailAsync)
}
