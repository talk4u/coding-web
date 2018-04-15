import fetchApi from '../fetchApi'

export const authorize = (username, password) => {
    return fetchApi('/api-token-auth/', {username, password}, 'post')
        .then(res => res.token)
}

export const verify = (token) => {
    return fetchApi('/api-token-verify/', {token:token}, 'post')
        .then(res => res.token)
}
