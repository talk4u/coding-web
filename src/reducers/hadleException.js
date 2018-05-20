import {types as actionType} from '../actions/handleException'

export const initialState = {
    reqs:[]
}


const exceptionReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.REQ_SAVE:
            return {
                ...state,
                reqs: state.reqs.slice().concat([action.payload])
            }
        case actionType.REQ_CLEAR:
            return {
                ...state,
                reqs: []
            }

        default:
            return state
    }
}

export default exceptionReducer
