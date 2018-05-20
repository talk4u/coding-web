export const types = {
    REQ_SAVE: "EXCEPTION/REQ/SAVE",
    REQ_CLEAR: "EXCEPTION/REQ/CLEAR",
}

const handleException = {
    401: (callee) => {
        return {
            type: types.REQ_SAVE,
            payload: callee
        }
    },
    clear: () => {
        return {
            type: types.REQ_CLEAR,
        }
    }
}

export default handleException