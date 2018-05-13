import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Private, {PrivateView} from './index'
import configureStore from "redux-mock-store";
import {MemoryRouter, Redirect, Route} from "react-router-dom";
import {gymDetailFetchRequested} from "../../../actions/gym";
import {logout} from "../../../actions/auth";

Enzyme.configure({ adapter: new Adapter() });

describe('Private Shallow render', () => {
    const initialState = {}

    const mockStore = configureStore();
    let store, container, dumb;
    store = mockStore(initialState)
    const mockFn = jest.fn();
    describe('default rendering', () => {
        beforeEach(()=>{
            container = shallow(<Private store={store}/> );
            dumb = shallow(<PrivateView match={{url:'/'}} logout={mockFn}/>)
        });
        it('+++ render the connected(SMART) component', () => {
            expect(container.length).toEqual(1)
            expect(container.prop('logout')()).toEqual(store.dispatch(logout()))
        });
        it('+++ trigger DUMB component function', () => {
            dumb.instance().logout()
            // expect(container.instance()).toEqual(1)
        });
        it('+++ render the DUMB component', () => {
            expect(dumb.length).toEqual(1)
        });
    });

})