import authReducer from './auth';
import {types as actionType} from '../actions/auth';

describe('todos reducer', () => {
    const state = {
        isAuthenticated: false,
        loading: true,
        token: null,
        redirectToReferrer: false,
        error: null
    };
    const token = 123
    const error = new Error();

    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(state)
    });


    it('should handle LOGIN', () => {
        expect(
            authReducer(state, {
                type: actionType.LOGIN_REQUEST,
            })
        ).toEqual({
            ...state,
            loading:true
        });

        expect(
            authReducer(
                state,
                {
                    type: actionType.LOGIN_SUCCESS,
                    payload: {token}
                }
            )
        ).toEqual({
            ...state,
            loading: false,
            isAuthenticated: true,
            redirectToReferrer: true,
            error: null,
            token,

        });

        expect(
            authReducer(
                state,
                {
                    type: actionType.LOGIN_FAILURE,
                    payload: error
                }
            )
        ).toEqual({
            ...state,
            loading: false,
            error,
            token: null,
            redirectToReferrer: true
        });

        expect(
            authReducer(
                state,
                {
                    type: actionType.LOGOUT,
                }
            )
        ).toEqual({
            ...state,
            loading: false,
            isAuthenticated: false,
            token: null,
            redirectToReferrer: false,
            error: null
        });

        expect(
            authReducer(
                state,
                {
                    type: actionType.UNAUTHORIZED,
                }
            )
        ).toEqual({
            ...state,
            loading: false,
            token: null,
            redirectToReferrer: false,
            error: null
        });

        expect(
            authReducer(
                state,
                {
                    type: actionType.AUTH_VERIFY,
                }
            )
        ).toEqual({
            ...state,
            loading: true
        });
    })
})