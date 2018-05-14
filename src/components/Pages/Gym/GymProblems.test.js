import GymProblem, {GymProblemsView} from "./GymProblems";
import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from "enzyme";
import {gymDetailFetchRequested, gymListFetchRequested} from "../../../actions/gym";

Enzyme.configure({ adapter: new Adapter() });

describe('GymProblem Shallow render', () => {
    const gym_detail = {
        name:'기본 자료 구조',
        problems:[
            {name: 'title', max_score: 0},
            {name: 'title', max_score: 0},
            {name: 'title', max_score: 100},
            {name: 'title', max_score: 100},
            {name: 'title', max_score: 70},
            {name: 'title', max_score: 100},
            {name: 'title', max_score: 100},
        ]
    }
    const initialState = {
        gymReducer:{
            detail:{
                data:gym_detail
            }
        }
    }
    const mockStore = configureStore();
    let store, container, dumb;
    const processed_gym = {
        data:{
            title: initialState.gymReducer.detail.data.name,
            solved: initialState.gymReducer.detail.data.problems.filter(p=>p.max_score===100),
            unsolved: initialState.gymReducer.detail.data.problems.filter(p=>p.max_score!==100),
        }

    }

    describe('with auth True', () => {
        const gym_id = 3;
        beforeEach(() => {
            store = mockStore(initialState);
            container = shallow(<GymProblem store={store}/>);
            dumb = shallow(<GymProblemsView gym={processed_gym} fetchGym={() => []} match={{url: '', params:{gym_id:gym_id}}}/>)
        });
        it('+++ render the connected(SMART) component', () => {
            expect(container.length).toEqual(1)
        });
        it('+++ check Prop matches with initialState', () => {

            expect(container.prop('gym').data).toEqual(processed_gym.data)
            expect(container.prop('fetchGym')(gym_id)).toEqual(store.dispatch(gymDetailFetchRequested(gym_id)))
        });
    });
    describe('with auth True', () => {
        beforeEach(() => {
            store = mockStore({
                gymReducer: {
                    detail: {
                        data: null
                    }
                }
            });
            container = shallow(<GymProblem store={store}/>);
        });
        it('+++ check Prop matches with initialState', () => {
            expect(container.prop('gym').data).toEqual({
                title: '',
                solved: [],
                unsolved: [],
            })
        });
    });
});