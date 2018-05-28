import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {Link, Route} from "react-router-dom";
import media, {sizes} from '../../Styles/media';
import {appbar_height} from '../../Layouts/var'
import Body from './Body';
import History from "./History";
import Rank from "./Rank";

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
    flex: 1;
    width: calc(${sizes.desktop}px - ${content_width});
    z-index: 100;
    ${media.desktop`
        width: ${sidebar_width};
        flex: initial;
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



class Problem extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {match, location} = this.props;
        return(
            <ProblemContainer>
                <Sidebar>
                    <Sidebar.Item to={`${match.url}`}>문제</Sidebar.Item>
                    <Sidebar.Item to={`${match.url}/history`}>히스토리</Sidebar.Item>
                    <Sidebar.Item to={`${match.url}/rank`}>순위</Sidebar.Item>
                </Sidebar>
                <Content>
                    <Route path={`${match.url}`} exact={true} component={props=><Body problemId={match.params.id} {...props}/>}/>
                    <Route path={`${match.url}/history`} exact={true} component={props=><History problemId={match.params.id} {...props}/>}/>
                    <Route path={`${match.url}/rank`} exact={true} component={props=><Rank problemId={match.params.id} {...props}/>}/>
                </Content>
            </ProblemContainer>
        )
    }
}

export default Problem