import { delay } from 'redux-saga'
import { all, call, fork, put, take, cancel, cancelled, takeLatest } from 'redux-saga/effects'
import Api from '../config/Api'
import {types as actionType, problemBodyFetchFail, problemBodyFetchSuccess} from "../actions/problem.ignore";


function* fetchProblemBodyAsync() {
    try{
        // const problems = yield call(Api.problem.list)
        const problems  = yield [
            {
                gym_id: 1,
                name: 'title',
                total_problem_count: 10,
                solved_problem_count: 3,
            },
            {
                gym_id: 2,
                name: 'title',
                total_problem_count: 10,
                solved_problem_count: 5,
            }
        ]
        yield put(problemBodyFetchSuccess(problems))
    } catch (error) {
        yield put(problemBodyFetchFail(error))
    }
}

export function* watchFetchProblemListAsync() {
    yield takeLatest(actionType.BODY_FETCH_REQUEST, fetchProblemBodyAsync)
}

/* TODO
 * fetch Problem Body
 * fetch Problem History
 * fetch Problem Rank
 */