import authReducer from './auth';
import {types as actionType} from '../actions/auth';

describe('todos reducer', () => {
    const state = {
        isAuthenticated: false,
        loading: false,
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
            isAuthenticated: true,
            token,
            redirectToReferrer: true,
            error: null

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
            isAuthenticated: false,
            error: error,
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
            isAuthenticated: false,
            token: null,
            redirectToReferrer: false
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