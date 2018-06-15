import {types as actionType} from '../actions/problem.ignore'

const initialState = {
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
    judge:{
        loading: false,
        error: null,
        data: null
    },
    rank: {
        loading: false,
        error: null,
        data: null
    },
    submission: {
        loading: false,
        error: null,
        data: null
    },
    upload: {
        loading: false,
        error: null,
        data: null
    }
}

const iterableState = (state, action) => {
    //actionType에 있는 애덜의 prefix와 postfix별로 return object를 달리해주는 함수작성

    let obj = {};
    for(let key in actionType){
        if(actionType.hasOwnProperty(key)){
            const stateKey = key.split('_')[0];
            obj = {
                ...obj,
                [stateKey]: (action) => {
                    if(action.type.includes('REQUEST')){
                        return {
                            ...state,
                            [stateKey.toLowerCase()]:{
                                ...state[stateKey.toLowerCase()],
                                loading: true,
                                error: null
                            }
                        }
                    }

                    if(action.type.includes('SUCCESS')){
                        return {
                            ...state,
                            [stateKey.toLowerCase()]: {
                                ...state[stateKey.toLowerCase()],
                                loading: false,
                                error: null,
                                data: action.payload
                            }
                        }
                    }

                    if(action.type.includes('FAILURE')){
                        return {
                            ...state,
                            [stateKey.toLowerCase()]: {
                                ...state[stateKey.toLowerCase()],
                                loading: false,
                                error: action.payload
                            }
                        }
                    }
                    return state;
                }
            }
        }
    }

    if(
        Object.keys(actionType).map(function(e) {
            return actionType[e]
        }).indexOf(action.type)<0
    ){
        return state;
    }else{
        return obj[action.type.split('/')[1]](action)
    }
}




const problemReducer = (state = initialState, action) => {
    return iterableState(state, action);
}

export default problemReducer
