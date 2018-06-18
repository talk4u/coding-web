import { delay } from 'redux-saga'
import { all, call, fork, put, take, cancel, cancelled, takeLatest, takeEvery, race } from 'redux-saga/effects'
import Api from '../config/Api'
import {
    types as actionType,
    problemBodyFetchFail,
    problemBodyFetchSuccess,
    problemHistoryFetchSuccess,
    problemHistoryFetchFail,
    problemRankFetchSuccess,
    problemRankFetchFail,
    problemSubmissionFetchSuccess,
    problemSubmissionFetchFail,
    problemJudgeFetchSuccess,
    problemJudgeFetchFail,
    problemHistoryPollStop, problemUploadPostSuccess, problemUploadPostFail
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
    yield takeEvery(actionType.HISTORY_FETCH_REQUEST, fetchProblemHistoryAsync)
}


function* fetchProblemJudgeAsync({type, payload:{problemId, judgeId, submissionId}}) {
    try{
        const {judge, submission} = yield all({
            judge: call(Api.problem.judge, problemId, judgeId),
            submission: call(Api.problem.submission, problemId, submissionId),
        })
        const result = {
            detail: judge,
            file: submission
        }

        yield put(problemJudgeFetchSuccess(result))
    } catch (error) {
        yield put(problemJudgeFetchFail(error))
    }
}

export function* watchFetchProblemJudgeAsync() {
    yield takeLatest(actionType.JUDGE_FETCH_REQUEST, fetchProblemJudgeAsync)
}


function* pollHistoryList({type, payload}) {
    while(true){
        try{
            const history = yield call(Api.problem.history, payload.id);
            const now_grading = history.filter(judge => judge.status==='ENQ' || judge.status==='IP');
            yield put(problemHistoryFetchSuccess(history));
            // if(now_grading.length === 0){
            //     yield put(problemHistoryPollStop());
            // }else{
                yield call(delay, 1000);
            // }
        } catch (error) {
            yield put(problemHistoryFetchFail(error));
            if(error.status===401 || error.status===404 ||error.status===400 ){
                yield put(problemHistoryPollStop());
            }else{
                yield call(delay, 1000);
            }
        }
    }
}

export function *watchPollHistoryList() {
    while(true){
        const action = yield take(actionType.HISTORY_POLL_START);
        yield race([
            call(pollHistoryList, action),
            take(actionType.HISTORY_POLL_STOP)
        ])
    }
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


function* postProblemUploadAsync({type, payload}) {
    try{
        const upload = yield call(Api.problem.upload, payload.problemId, payload.file)

        yield put(problemUploadPostSuccess(upload))
    } catch (error) {
        yield put(problemUploadPostFail(error))
    }
}

export function* watchPostProblemUploadAsync() {
    yield takeLatest(actionType.UPLOAD_POST_REQUEST, postProblemUploadAsync)
}


/* TODO
 * fetch Problem Body
 * fetch Problem History
 * fetch Problem Rank
 */