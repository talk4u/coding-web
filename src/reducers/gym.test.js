import gymReducer from './gym';
import {types as actionType} from '../actions/gym';

describe('todos reducer', () => {
    const state = {
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
    };
    const error = new Error();

    it('should return the initial state', () => {
        expect(gymReducer(undefined, {})).toEqual(state)
    });


    it('should handle LIST', () => {
        expect(
            gymReducer(state, {
                type: actionType.LIST_FETCH_REQUEST,
            })
        ).toEqual({
            ...state,
            list: {
                ...state.list,
                loading: true,
                error: null
            }
        });

        expect(
            gymReducer(
                state,
                {
                    type: actionType.LIST_FETCH_SUCCESS,
                    payload: []
                }
            )
        ).toEqual({
            ...state,
            list: {
                ...state.list,
                loading: false,
                error: null,
                data: []
            }
        });

        expect(
            gymReducer(
                state,
                {
                    type: actionType.LIST_FETCH_FAILURE,
                    payload: error
                }
            )
        ).toEqual({
            ...state,
            list: {
                ...state.list,
                loading: false,
                error: error,
            }
        });
    });

    it('should handle DETAIL', () => {
        expect(
            gymReducer(state, {
                type: actionType.DETAIL_FETCH_REQUEST,
            })
        ).toEqual({
            ...state,
            detail: {
                ...state.detail,
                loading: true,
                error: null
            }
        });

        expect(
            gymReducer(
                state,
                {
                    type: actionType.DETAIL_FETCH_SUCCESS,
                    payload: {}
                }
            )
        ).toEqual({
            ...state,
            detail: {
                ...state.detail,
                loading: false,
                error: null,
                data: {}
            }
        });

        expect(
            gymReducer(
                state,
                {
                    type: actionType.DETAIL_FETCH_FAILURE,
                    payload: error
                }
            )
        ).toEqual({
            ...state,
            detail: {
                ...state.detail,
                loading: false,
                error: error,
            }
        });
    })
})