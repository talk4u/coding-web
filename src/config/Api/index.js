import {authorize, verify} from './authorize'
import {gym} from './gym'
import {problem} from './problem'
import { storeItem, clearItem } from './storage'
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
