export const types = {
    BODY_FETCH_REQUEST: "PROBLEM/BODY/FETCH/REQUEST",
    BODY_FETCH_SUCCESS: "PROBLEM/BODY/FETCH/SUCCESS",
    BODY_FETCH_FAILURE: "PROBLEM/BODY/FETCH/FAILURE",
    HISTORY_FETCH_REQUEST: "PROBLEM/HISTORY/FETCH/REQUEST",
    HISTORY_FETCH_SUCCESS: "PROBLEM/HISTORY/FETCH/SUCCESS",
    HISTORY_FETCH_FAILURE: "PROBLEM/HISTORY/FETCH/FAILURE",
    SUBMISSION_FETCH_REQUEST: "PROBLEM/SUBMISSION/FETCH/REQUEST",
    SUBMISSION_FETCH_SUCCESS: "PROBLEM/SUBMISSION/FETCH/SUCCESS",
    SUBMISSION_FETCH_FAILURE: "PROBLEM/SUBMISSION/FETCH/FAILURE",
    RANK_FETCH_REQUEST: "PROBLEM/RANK/FETCH/REQUEST",
    RANK_FETCH_SUCCESS: "PROBLEM/RANK/FETCH/SUCCESS",
    RANK_FETCH_FAILURE: "PROBLEM/RANK/FETCH/FAILURE",
}


export const problemBodyFetchRequested = (id) => {
    return {
        type: types.BODY_FETCH_REQUEST,
        payload: id
    }
}

export const problemBodyFetchSuccess = (problemBody) => {
    return {
        type: types.BODY_FETCH_SUCCESS,
        payload: problemBody
    }
}

export const problemBodyFetchFail = (error) => {
    return {
        type: types.BODY_FETCH_FAILURE,
        payload: error
    }
}

export const problemHistoryFetchRequested = (id) => {
    return {
        type: types.HISTORY_FETCH_REQUEST,
        payload: id,
    }
}

export const problemHistoryFetchSuccess = (problemHistory) => {
    return {
        type: types.HISTORY_FETCH_SUCCESS,
        payload: problemHistory
    }
}

export const problemHistoryFetchFail = (error) => {
    return {
        type: types.HISTORY_FETCH_FAILURE,
        payload: error
    }
}

export const problemRankFetchRequested = (id) => {
    return {
        type: types.RANK_FETCH_REQUEST,
        payload: id
    }
}

export const problemRankFetchSuccess = (problemRank) => {
    return {
        type: types.RANK_FETCH_SUCCESS,
        payload: problemRank
    }
}

export const problemRankFetchFail = (error) => {
    return {
        type: types.RANK_FETCH_FAILURE,
        payload: error
    }
}


export const problemSubmissionFetchRequested = (problemId, submissionId) => {
    return {
        type: types.SUBMISSION_FETCH_REQUEST,
        payload: {
            problemId,
            submissionId
        }
    }
}

export const problemSubmissionFetchSuccess = (submission) => {
    return {
        type: types.SUBMISSION_FETCH_SUCCESS,
        payload: submission
    }
}

export const problemSubmissionFetchFail = (error) => {
    return {
        type: types.SUBMISSION_FETCH_FAILURE,
        payload: error
    }
}

