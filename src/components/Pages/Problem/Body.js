import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {problemBodyFetchRequested} from "../../../actions/problem.ignore";
import Markdown from '../../Molecules/Markdown/';
import {Header} from "semantic-ui-react";
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


const mapStateToProps = (state, ownProps) => {
    return {
        problem: state.problemReducer.body.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProblem: (id) => dispatch(problemBodyFetchRequested(id))
    }
}


class BodyView extends React.Component{
    constructor(props){
        super(props)
        this.props.fetchProblem(this.props.problemId)
    }

    render(){
        return(
            <BodyContainer>
                {this.props.problem!==null &&
                <React.Fragment>
                    <Header as={'h1'}>{this.props.problem.name}</Header>
                    <Markdown
                        options={{
                            html: true,
                            katex: true,
                        }}
                        source={this.props.problem.description}/>
                </React.Fragment>

                }

            </BodyContainer>
        )
    }
}

const Body = connect(
    mapStateToProps,
    mapDispatchToProps
)(BodyView);

export default Body;