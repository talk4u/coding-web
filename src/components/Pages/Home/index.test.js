import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home, {HomeView} from './index'
import configureStore from "redux-mock-store";
import renderer from 'react-test-renderer';
import {Redirect} from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe('Home Shallow render', () => {
    const initialState = {
        authReducer:{
            isAuthenticated: true
        }
    }
    const mockStore = configureStore();
    let store, container, dumb;
    store = mockStore(initialState)
    describe('with auth True', () => {
        beforeEach(()=>{
            container = shallow(<Home store={store}/> );
            dumb = shallow(<HomeView isAuthenticated={true}/>)
        });
        it('+++ render the connected(SMART) component', () => {
            expect(container.length).toEqual(1)
        });
        it('+++ render the DUMB component as True', () => {
            expect(dumb.length).toEqual(1)
            expect(dumb.find(Redirect).prop('to')).toEqual('/gym');
        });
    })
    describe('with auth False', () => {
        beforeEach(()=>{
            dumb = shallow(<HomeView isAuthenticated={false}/>)
        });
        it('+++ render the DUMB component as False', () => {
            expect(dumb.length).toEqual(1)
            expect(dumb.find(Redirect).prop('to')).toEqual('/sign');
        });
    })

})