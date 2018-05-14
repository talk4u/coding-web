import { delay } from 'redux-saga'
import { all, call, fork, put, take, cancel, cancelled, takeLatest } from 'redux-saga/effects'
import {types as actionType, gymListFetchSuccess, gymListFetchFail, gymDetailFetchSuccess, gymDetailFetchFail} from '../actions/gym'
import Api from '../config/Api'



function* fetchGymListAsync() {
    try{
        // const gym = yield call(Api.gym.list)
        const gym  = yield [
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
        yield put(gymListFetchSuccess(gym))
    } catch (error) {
        yield put(gymListFetchFail(error))
    }
}

function* fetchGymDetailAsync() {
    try{
        // const gym = yield call(Api.gym.detail)
        const gym  = yield {
            name:'기본 자료 구조',
            problems:[
                {name: 'title', max_score: 0},
                {name: 'title', max_score: 0},
                {name: 'title', max_score: 100},
                {name: 'title', max_score: 100},
                {name: 'title', max_score: 70},
                {name: 'title', max_score: 100},
                {name: 'title', max_score: 100},
            ]}
        yield put(gymDetailFetchSuccess(gym))
    } catch (error) {
        yield put(gymDetailFetchFail(error))
    }
}


export function* watchFetchGymListAsync() {
    yield takeLatest(actionType.LIST_FETCH_REQUEST, fetchGymListAsync)
}

export function* watchFetchGymDetailAsync() {
    yield takeLatest(actionType.DETAIL_FETCH_REQUEST, fetchGymDetailAsync)
}
