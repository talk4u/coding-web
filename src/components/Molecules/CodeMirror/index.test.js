import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CodeMirror from './index'
import {UnControlled} from "react-codemirror2";
import renderer from "react-test-renderer";
Enzyme.configure({ adapter: new Adapter() });


describe('CodeMirror Shallow render', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<CodeMirror/> );
    });
    // it('+++ render the DUMB component', () => {
    //     expect(wrapper.length).toEqual(1)
    // });
    // it('+++ render Styled component', () => {
    //     expect(wrapper.find(UnControlled).render()).to.have.length(1);
    //     console.log(expect(wrapper.find(UnControlled).render()))
    // });
})