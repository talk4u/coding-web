import { delay } from 'redux-saga'
import { all, call, fork, put, take, cancel, cancelled, takeLatest } from 'redux-saga/effects'
import Api from '../config/Api'
import {types as actionType, problemBodyFetchFail, problemBodyFetchSuccess} from "../actions/problem.ignore";


function* fetchProblemBodyAsync({type, payload}) {
    try{
        const problem = yield call(Api.problem.body, payload)

        yield put(problemBodyFetchSuccess(problem))
    } catch (error) {
        yield put(problemBodyFetchFail(error))
    }
}

export function* watchFetchProblemBodyAsync() {
    yield takeLatest(actionType.BODY_FETCH_REQUEST, fetchProblemBodyAsync)
}

/* TODO
 * fetch Problem Body
 * fetch Problem History
 * fetch Problem Rank
 */