import fetchApi from '../fetchApi'

export const problem = {
    body: (id) => {
        return fetchApi(`/problems/${id}/`, null, 'get')
    },
    history: (id) => {
        return fetchApi(`/problems/${id}/submissions/`, null, 'get')
    },
    rank: (id) => {
        return fetchApi(`/problems/${id}/ranks/`, null, 'get')
    },
    submission: (problem_id, submission_id) => {
        return fetchApi(`/problems/${problem_id}/submissions/${submission_id}/`, null, 'get')
    }
}

