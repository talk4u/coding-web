import fetchApi from '../fetchApi'

export const gym = {
    list: () => {
        return fetchApi(`/gyms/`, null, 'get')
    },
    detail: (id) => {
        return fetchApi(`/gyms/${id}/`, null, 'get')
    },
}

