import rootReducer from './index'
import authReducer from './auth'
import gymReducer from './gym'
import problemReducer from './problem.ignore'
import {createStore} from "redux";


describe('App Reducer ', () => {
    it('should have child reducers', () => {
        let store = createStore(rootReducer)

// check that initial state of the root reducer matches
// what child reducers return given an empty action

        expect(store.getState().authReducer).toEqual(authReducer(undefined, {}))
        expect(store.getState().gymReducer).toEqual(gymReducer(undefined, {}))
        expect(store.getState().problemReducer).toEqual(problemReducer(undefined, {}))

// alternatively you can test values explicitly although this
// couples this test to child reducer impl details:

        expect(store.getState().authReducer).toEqual({
            isAuthenticated: false,
            loading: false,
            token: null,
            redirectToReferrer: false,
            error: null
        })
        expect(store.getState().gymReducer).toEqual({
            list: {
                loading: false,
                error: null,
                data: null
            },
            detail: {
                loading: false,
                error: null,
                data: null
            },
        })
        expect(store.getState().problemReducer).toEqual({
            body: {
                loading: false,
                error: null,
                data: null
            },
            history: {
                loading: false,
                error: null,
                data: null
            },
            rank: {
                loading: false,
                error: null,
                data: null
            },
        })

    })
})