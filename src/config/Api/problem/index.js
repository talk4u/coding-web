import fetchApi from '../fetchApi'

export const problem = {
    body: ({id}) => {
        return fetchApi(`/problems/${id}`, null, 'get')
    },
    history: ({id}) => {
        return fetchApi(`/problems/${id}/submissions`, null, 'get')
    },
    rank: ({id}) => {
        return fetchApi(`/problems/${id}/rank`, null, 'get')
    },

}

