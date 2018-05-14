import { all } from 'redux-saga/effects'
import { loginFlow } from './auth'
import {watchFetchGymDetailAsync, watchFetchGymListAsync} from './gym'
import {watchFetchProblemListAsync} from "./problem";

export default function* rootSaga() {
    yield all([
        loginFlow(),
        watchFetchGymListAsync(),
        watchFetchGymDetailAsync(),
        watchFetchProblemListAsync(),
    ])
}
