import fetchApi from '../fetchApi'

export const gym = {
    list: () => {
        return fetchApi(`/gym`, null, 'get')
    },
    detail: ({id}) => {
        return fetchApi(`/gym/${id}`, null, 'get')
    },
}

