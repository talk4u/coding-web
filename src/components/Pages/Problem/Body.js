import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {problemBodyFetchRequested} from "../../../actions/problem.ignore";
import Markdown from '../../Molecules/Markdown/';
import {Header, Label, Loader} from "semantic-ui-react";
import media from "../../Styles/media";

const BodyContainer = styled.div`
    padding: 3em 3em;
    background: #fff;
    line-height: 1.4;
    ${media.desktop`
        padding: 2em 2em;
    `}    
    ${media.phone`
        padding: 2em 1.4em;
    `}
`
const ProblemHeader = styled(Header)`
    &&{
        padding: .3em 0;
        position: relative;
        margin-bottom: 1em;
        &:after{
            content: "";
            position: absolute;
            width: 2px;
            height: 100%;
            background: #000;
            bottom: 0;
            left: 0;
            margin-left: -3rem;
            ${media.desktop`
                margin-left: -2rem;
            `}
            ${media.phone`
                margin-left: -1.4rem;
            `}
        }
    }
    
`
const ProblemLimit = styled.div`
    margin-bottom: .8em;
    color: #959595;
`




class Body extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <BodyContainer>
                {!this.props.problem.loading && this.props.problem.data!==null ?
                <React.Fragment>
                    <ProblemHeader as={'h1'}>
                        {this.props.problem.data.name}
                        <div>
                            <Label style={{marginLeft:0}} size={'small'}>
                                메모리 제한
                                <Label.Detail>{this.props.problem.data.mem_limit_bytes/1024/1024}MB</Label.Detail>
                            </Label>
                            <Label size={'small'}>
                                시간 제한
                                <Label.Detail>{this.props.problem.data.time_limit_seconds}초</Label.Detail>
                            </Label>
                        </div>
                    </ProblemHeader>

                    <Markdown
                        options={{
                            html: true,
                            katex: true,
                        }}
                        source={this.props.problem.data.description}/>
                </React.Fragment>
                :
                    <Loader active={true} inline='centered'/>
                }

            </BodyContainer>
        )
    }
}

export default Body;