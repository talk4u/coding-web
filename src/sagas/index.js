import { all } from 'redux-saga/effects'
import { loginFlow } from './auth'
import { watchFetchUserAsync } from './user'
import { watchFetchPromiseAsync, watchCreatePromiseAsync } from './promises'

export default function* rootSaga() {
    yield all([
        loginFlow(),
        watchFetchPromiseAsync(),
        watchCreatePromiseAsync(),
        watchFetchUserAsync(),
    ])
}
