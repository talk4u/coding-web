import {authorize, verify} from './authorize'
import {gym} from './gym'
import {problem} from './problem/index.ignore'
import { storeItem, clearItem } from './storage/index.ignore'
import asyncTest from './asyncTest'
import fetchApi from './fetchApi'
const Api = {
    authorize,
    gym,
    problem,
    verify,
    storeItem,
    clearItem,
    asyncTest,
    fetchApi
}

export default Api
