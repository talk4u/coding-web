import { all } from 'redux-saga/effects'
import { loginFlow } from './auth'
import {watchFetchGymDetailAsync, watchFetchGymListAsync} from './gym'
import {watchFetchProblemBodyAsync} from "./problem";

export default function* rootSaga() {
    yield all([
        loginFlow(),
        watchFetchGymListAsync(),
        watchFetchGymDetailAsync(),
        watchFetchProblemBodyAsync(),
    ])
}
