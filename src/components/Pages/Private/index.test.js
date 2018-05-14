import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Private, {PrivateView} from './index'
import configureStore from "redux-mock-store";
import {Redirect} from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe('Private Shallow render', () => {
    const initialState = {}

    const mockStore = configureStore();
    let store, container, dumb;
    store = mockStore(initialState)
    const mockFn = jest.fn();
    beforeEach(()=>{
        container = shallow(<Private store={store}/> );
        dumb = shallow(<PrivateView match={{url:'/'}} logout={mockFn}/>)
    });
    it('+++ render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });
    it('+++ trigger DUMB component function', () => {
        dumb.instance().logout()
        // expect(container.instance()).toEqual(1)
    });
    it('+++ render the DUMB component', () => {
        expect(dumb.length).toEqual(1)
    });


})