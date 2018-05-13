import {types, loginRequested, loginSuccess, loginFail, logout, authVerify} from './auth'

describe('Auth Actions', () => {
    it('should create action when login requested', () => {
        const typed_auth = {username:'username', password:'password'};
        expect(loginRequested(typed_auth)).toEqual(
            {
                type: types.LOGIN_REQUEST,
                payload: typed_auth
            }
        )
    });

    it('should create action when login success', () => {
        const token = 123;
        expect(loginSuccess(token)).toEqual(
            {
                type: types.LOGIN_SUCCESS,
                payload: {token}
            }
        )
    });

    it('should create action when login fail', () => {
        const error = new Error();
        expect(loginFail(error)).toEqual(
            {
                type: types.LOGIN_FAILURE,
                payload: {error}
            }
        )
    });

    it('should create action when logout', () => {
        expect(logout()).toEqual(
            {
                type: types.LOGOUT,
            }
        )
    });

    it('should create action when verified', () => {
        const old_auth = {
            token: 123,
            username: 'username'
        }
        expect(authVerify(old_auth.username, old_auth.token)).toEqual(
            {
                type: types.AUTH_VERIFY,
                payload: old_auth
            }
        )
    });
})