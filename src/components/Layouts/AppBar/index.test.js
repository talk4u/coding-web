import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import AppBar, {AppBarContainer} from './index'
import {darkTheme, defaultTheme} from "./theme";
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'

Enzyme.configure({ adapter: new Adapter() });

describe('AppBar Shallow render', () => {
    let container
    beforeEach(()=>{
        container = shallow(<AppBar/> )
    })
    it('+++ render the connected(SMART) component', () => {
        expect(container.length).toEqual(1)
    });

    it('+++ render Styled component', () => {
        const tree = renderer.create(<AppBarContainer theme={darkTheme}/>).toJSON()
        expect(tree).toHaveStyleRule('color', darkTheme.color)
    });
});