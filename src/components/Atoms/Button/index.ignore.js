import React from 'react';
import { Button as SemainticButton } from 'semantic-ui-react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2'
import overlayStyles from "../../Styles";

const HoverStyleButton = styled(SemainticButton)`
&&&{
    position: relative;
  appearance: none;
  background: ${props=>props.tone || '#959595'};
  padding: .67em 1em;
  border: none;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  font-weight: 200;
  margin: 0;
  span {
    position: relative;
  }
  &:hover{
    ${overlayStyles.shadow}
  }
  &::before {
    --size: 0;
    content: '';
    position: absolute;
    left: ${props=>props.x}px;
    top: ${props=>props.y}px;
    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle closest-side, ${props=> tinycolor(props.tone || '#959595').spin(30).toString()}, transparent);
    transform: translate(-50%, -50%);
    transition: width .2s ease, height .2s ease;
  }
  &:hover::before {
    --size: 20em;
  }
  
}    
`

HoverStyleButton.Inner = styled.div`
    position:relative;
    z-index:1;
`

class Button extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x: 0,
            y: 0
        }
        this.handleMove = this.handleMove.bind(this)
    }

    handleMove(e){
        e.persist();
        this.setState({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
        })
    }
    render(){
        const {children, color, ...rest} = this.props;
        return(
            <HoverStyleButton onMouseMove={this.handleMove} x={this.state.x} y={this.state.y} tone={color} {...rest}>
                <HoverStyleButton.Inner>{children}</HoverStyleButton.Inner>
            </HoverStyleButton>
        )
    }
}

export default Button;
