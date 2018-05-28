import { delay } from 'redux-saga'
import { all, call, fork, put, take, cancel, cancelled, takeLatest } from 'redux-saga/effects'
import Api from '../config/Api'
import {
    types as actionType,
    problemBodyFetchFail,
    problemBodyFetchSuccess,
    problemHistoryFetchSuccess,
    problemHistoryFetchFail,
    problemRankFetchSuccess,
    problemRankFetchFail,
    problemSubmissionFetchSuccess, problemSubmissionFetchFail
} from "../actions/problem.ignore";


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



function* fetchProblemHistoryAsync({type, payload}) {
    try{
        const history = yield call(Api.problem.history, payload)

        yield put(problemHistoryFetchSuccess(history))
    } catch (error) {
        yield put(problemHistoryFetchFail(error))
    }
}

export function* watchFetchProblemHistoryAsync() {
    yield takeLatest(actionType.HISTORY_FETCH_REQUEST, fetchProblemHistoryAsync)
}



function* fetchProblemRankAsync({type, payload}) {
    try{
        const rank = yield call(Api.problem.rank, payload)

        yield put(problemRankFetchSuccess(rank))
    } catch (error) {
        yield put(problemRankFetchFail(error))
    }
}

export function* watchFetchProblemRankAsync() {
    yield takeLatest(actionType.RANK_FETCH_REQUEST, fetchProblemRankAsync)
}


function* fetchProblemSubmissionAsync({type, payload:{problemId, submissionId}}) {
    try{
        const submission = yield call(Api.problem.submission, problemId, submissionId)

        yield put(problemSubmissionFetchSuccess(submission))
    } catch (error) {
        yield put(problemSubmissionFetchFail(error))
    }
}

export function* watchFetchProblemSubmissionAsync() {
    yield takeLatest(actionType.SUBMISSION_FETCH_REQUEST, fetchProblemSubmissionAsync)
}

/* TODO
 * fetch Problem Body
 * fetch Problem History
 * fetch Problem Rank
 */