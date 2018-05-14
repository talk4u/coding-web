import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import AppBar from './index'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AppBar Shallow render', () => {
    let container
    beforeEach(()=>{
        container = shallow(<AppBar/> )
    })
    it('+++ render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });
});