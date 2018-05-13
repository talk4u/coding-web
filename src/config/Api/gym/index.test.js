import { gym } from './index'
import axios from 'axios';
import apiConfig from "../config"
import MockAdapter from 'axios-mock-adapter'

describe('Api gym', () => {
    it('returns data when gym list is called', done => {
        let mock = new MockAdapter(axios);
        const data = [];
        mock.onGet(`${apiConfig.url}/gym`).reply(200, data);

        gym.list().then(response => {
            expect(response).toEqual(data);
            done();
        });
    });
    it('returns data when gym detail is called', done => {
        let mock = new MockAdapter(axios);
        const data = [];
        mock.onGet(`${apiConfig.url}/gym/5`).reply(200, data);

        gym.detail({id:5}).then(response => {
            expect(response).toEqual(data);
            done();
        });
    });
})