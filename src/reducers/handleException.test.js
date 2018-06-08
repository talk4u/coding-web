import exceptionReducer from './hadleException';
import {types as actionType} from '../actions/handleException';

describe('exception reducer', () => {
    const state = {
        reqs:[]
    };
    const error = new Error();

    it('should return the initial state', () => {
        expect(exceptionReducer(undefined, {})).toEqual(state)
    });


    it('should handle LIST', () => {
        expect(
            exceptionReducer(state, {
                type: actionType.REQ_SAVE,
                payload: []
            })
        ).toEqual({
            ...state,
            reqs: [[]]
        });

        expect(
            exceptionReducer(
                state,
                {
                    type: actionType.REQ_CLEAR,
                }
            )
        ).toEqual({
            ...state,
            reqs: []
        });

    });
})