import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {Link, Route} from "react-router-dom";
import media, {sizes} from '../../Styles/media';
import {appbar_height, colors} from '../../Layouts/var'
import Body from './Body';
import History from "./History";
import Rank from "./Rank";
import ScoreBar from "../../Molecules/ScoreBar";
import Button from "../../Atoms/Button";
import {problemBodyFetchRequested} from "../../../actions/problem.ignore";
import Dropzone from "react-dropzone";
import tinycolor from 'tinycolor2'

const ProblemContainer = styled.div`
    display: flex;
    padding: 3em 0;
    ${media.desktop`
        padding: 2em 2em 2em 0;
    `}
    ${media.phone`
        padding: 1em 1em;
        flex-direction: column;
    `}
`

const sidebar_width = '7em';
const sidebar_height = '40px';
const content_width = '1024px';

const Sidebar = styled.aside`
    position: fixed;
    display: flex;
    flex-direction: column;
    padding: 0 3em;
    flex: 1;
    width: calc(${sizes.desktop}px - ${content_width});
    z-index: 100;
    ${media.desktop`
        width: ${sidebar_width};
        flex: initial;
        padding: 0 .8em;
    `}
    ${media.phone`
        width: 100%;
        top: ${appbar_height}px;
        left: 0;
        height: ${sidebar_height};
        flex-direction: row;
        background: #f1f1f5;
        padding: 0 1em;
    `}
`
Sidebar.Item = styled(Link)`
    padding: 1em 0;
    text-align: center;
    color: #959599;
    &:hover{
        color: #313133;
    }
    ${media.desktop`
        padding: .8em ;
    `}
`

const Content = styled.div`
    width: ${content_width};
    margin-left: calc(100% - 1024px);
    flex-shrink: 0;
    ${media.desktop`
        width: calc(100% - ${sidebar_width});
        margin-left: ${sidebar_width};
        flex-shrink: initial;
        flex: 1;
    `}
    ${media.phone`
        width: auto;
        margin-left: 0;
        margin-top: ${sidebar_height};
    `}
`


const StyledScoreBar = styled(ScoreBar)`
    margin: 2em 0;
`

const StyledDropzone = styled(Dropzone)`
    padding: 2em 0;
    margin: 1em 0;
    transition: all .2s;
    ${props=> props.active ? `background-color: ${props.color}`:null};
`


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        problem: state.problemReducer.body.data
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProblem: (id) => dispatch(problemBodyFetchRequested(id))
    }
}

class ProblemView extends React.Component{
    constructor(props){
        super(props)
        this.props.fetchProblem(this.props.match.params.id);
        this.state = {
            file: null
        };
        this.onDrop = this.onDrop.bind(this);
        this.submitCode = this.submitCode.bind(this);
    }
    onDrop(file){
        this.setState({
            file: file[0]
        })
    }
    submitCode(e){
        e.stopPropagation()
        this.props.history.push(`${this.props.match.url}/history`);
    }
    render(){
        const {match, location, problem} = this.props;
        return(
            <ProblemContainer>
                <Sidebar>
                    <Sidebar.Item to={`${match.url}`}>문제</Sidebar.Item>
                    <Sidebar.Item to={`${match.url}/history`}>히스토리</Sidebar.Item>
                    <Sidebar.Item to={`${match.url}/rank`}>순위</Sidebar.Item>
                    <StyledScoreBar score={problem===null ? 0 : problem.max_score}/>
                    <Dropzone onDrop={this.onDrop}
                              multiple={false}
                              style={{padding:'2em 0', margin:'1em 0', display:'flex', flexDirection:'column', borderRadius:'2px', textAlign:'center'}}
                              activeStyle={{border: `1px solid ${colors.purple}`}}
                    >
                        {this.state.file!==null ? (
                                <React.Fragment>
                                    <span>{this.state.file.name}</span>
                                    <Button color={colors.purple} size={'small'} onClick={this.submitCode}> 제출 </Button>
                                    <a style={{marginTop: '1em', cursor:'pointer'}}>다른 파일 선택</a>
                                </React.Fragment>
                            ) :
                            (
                                <Button size={'small'}> 업로드 </Button>
                            )}
                    </Dropzone>


                </Sidebar>
                <Content>
                    <Route path={`${match.url}`} exact={true} component={props=><Body problemId={match.params.id} problem={problem} {...props}/>}/>
                    <Route path={`${match.url}/history`} exact={true} component={props=><History problemId={match.params.id} {...props}/>}/>
                    <Route path={`${match.url}/rank`} exact={true} component={props=><Rank problemId={match.params.id} {...props}/>}/>
                </Content>
            </ProblemContainer>
        )
    }
}

const Problem = connect(
    mapStateToProps,
    mapDispatchToProps)
(ProblemView)

export default Problem