import {types,
    gymDetailFetchFail,
    gymDetailFetchSuccess,
    gymDetailFetchRequested,
    gymListFetchFail,
    gymListFetchRequested,
    gymListFetchSuccess} from './gym'

describe('Gym Actions', () => {
    it('should create action when list requested', () => {
        expect(gymListFetchRequested()).toEqual(
            {
                type: types.LIST_FETCH_REQUEST,
            }
        )
    });

    it('should create action when list success', () => {
        const gymList = []
        expect(gymListFetchSuccess(gymList)).toEqual(
            {
                type: types.LIST_FETCH_SUCCESS,
                payload: gymList
            }
        )
    });

    it('should create action when list fail', () => {
        const error = new Error();
        expect(gymListFetchFail(error)).toEqual(
            {
                type: types.LIST_FETCH_FAILURE,
                payload: error
            }
        )
    });

    it('should create action when detail requested', () => {
        const id = 1;
        expect(gymDetailFetchRequested(id)).toEqual(
            {
                type: types.DETAIL_FETCH_REQUEST,
                payload: id
            }
        )
    });

    it('should create action when detail success', () => {
        const gym = {}
        expect(gymDetailFetchSuccess(gym)).toEqual(
            {
                type: types.DETAIL_FETCH_SUCCESS,
                payload: gym
            }
        )
    });

    it('should create action when detail fail', () => {
        const error = new Error();
        expect(gymDetailFetchFail(error)).toEqual(
            {
                type: types.DETAIL_FETCH_FAILURE,
                payload: error
            }
        )
    });
})