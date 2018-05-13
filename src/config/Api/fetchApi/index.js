import axios from "axios";
import apiConfig from "../config"

const fetchApi = (endPoint, payload={}, method='get', headers={}, contentType='application/json') => {
    const accessToken = localStorage.getItem('token');
    return axios({
        method: method,
        url: `${apiConfig.url}${endPoint}`,
        headers: accessToken ? {
            'Authorization' : 'JWT ' + accessToken,
            'content-type' : contentType
        } : headers,
        data: payload
    })
        .then(res => res.data)
        .catch(err => {
            throw {
                status: err.response.status,
                data: err.response.data
            }
        })
}

export default fetchApi
