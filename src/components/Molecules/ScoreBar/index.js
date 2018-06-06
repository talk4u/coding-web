import React from 'react';
import styled from 'styled-components';
import {colors} from "../../Layouts/var";

const ScoreBarView = styled.div`
    display: block;
    position: relative;
    border-radius: 100px;
    width: 100%;
    padding-top: 3%;
    overflow: hidden;
    &:before{
        content: "";
        position: absolute;
        left:0;
        top:0;
        height: 100%;
        width: 100%;
        background-color: #e1e1e7;
    }
    &:after{
        content: "";
        position: absolute;
        left:0;
        top:0;
        height: 100%;
        width: ${props=> props.score}%;
        background-color: ${props =>props.score===100 ? colors.green : colors.yellow};
    }
    
`
ScoreBarView.Score = styled.div`
    text-align: center;
`

class ScoreBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {score, ...rest} = this.props;
        return(
            <div {...rest}>
                <ScoreBarView.Score>{score}</ScoreBarView.Score>
                <ScoreBarView score={score}/>
            </div>
        )
    }
}


export default ScoreBar