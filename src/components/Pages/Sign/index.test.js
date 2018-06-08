import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sign, {SignView} from './index'
import configureStore from "redux-mock-store";
import renderer from 'react-test-renderer';
import {Redirect} from "react-router-dom";
import {types, loginRequested} from "../../../actions/auth";


Enzyme.configure({ adapter: new Adapter() });

describe('Sign Shallow render', () => {
    const initialState = {
        authReducer:{
            isAuthenticated: true
        }
    }
    const mockStore = configureStore();
    let store, container, dumb;

    describe('with auth True', () => {
        beforeEach(() => {
            store = mockStore(initialState)
            container = shallow(<Sign store={store}/>);
            dumb = shallow(<SignView isAuthenticated={initialState.authReducer.isAuthenticated} location={{state: {from: {pathname: "/"}}}}/>)
        });
        it('+++ render the connected(SMART) component', () => {
            expect(container.length).toEqual(1)
            expect(container.prop('isAuthenticated')).toEqual(initialState.authReducer.isAuthenticated)
        });
        it('+++ render the DUMB component', () => {
            expect(dumb.length).toEqual(1)
        });
    });

    describe('with auth False', () => {
        beforeEach(() => {
            container = shallow(<Sign store={store}/>);
            dumb = shallow(<SignView isAuthenticated={false} location={{state: {from: {pathname: "/"}}}}/>)
        });
        it('+++ render the connected(SMART) component', () => {
            expect(container.length).toEqual(1)

        });
        it('+++ render the DUMB component', () => {
            expect(dumb.length).toEqual(1)
        });
    });


})