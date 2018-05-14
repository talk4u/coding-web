import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Gym from './index'
Enzyme.configure({ adapter: new Adapter() });

describe('GymProblem Shallow render', () => {
    let wrapper;
    const url = '/';
    beforeEach(()=>{
        wrapper = shallow(<Gym match={{url:'/'}}/> );
    });
    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });
})