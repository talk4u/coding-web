import {types} from "./handleException";
import handleException from "./handleException";

describe('Gym Actions', () => {
    it('should create action when handle 401 exception', () => {
        const callee = () => {}
        expect(handleException[401](callee)).toEqual(
            {
                type: types.REQ_SAVE,
                payload: callee
            }
        )
    });

    it('should create action when handle clear reqs', () => {
        expect(handleException.clear()).toEqual(
            {
                type: types.REQ_CLEAR,
            }
        )
    });
})