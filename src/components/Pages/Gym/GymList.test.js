import GymList, {GymListView} from "./GymList";
import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from "enzyme";
import {loginRequested} from "../../../actions/auth";
import {gymListFetchRequested} from "../../../actions/gym";

Enzyme.configure({ adapter: new Adapter() });

describe('GymList Shallow render', () => {
    const gyms = [
        {
            gym_id: 1,
            name: 'title',
            total_problem_count: 10,
            solved_problem_count: 3,
        },
        {
            gym_id: 2,
            name: 'title',
            total_problem_count: 10,
            solved_problem_count: 5,
        }
    ]
    const initialState = {
        gymReducer:{
            list:{
                data:gyms
            }
        }
    }
    const mockStore = configureStore()
    let store, container, dumb

    beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(<GymList store={store} /> )
        dumb = shallow(<GymListView gyms={gyms} fetchGym={()=>[]} match={{url:''}}/>)
    });
    it('+++ render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });
    it('+++ check Prop matches with initialState', () => {
        expect(container.prop('gyms')).toEqual(gyms)
        expect(container.prop('fetchGym')()).toEqual(store.dispatch(gymListFetchRequested()))
    });

});