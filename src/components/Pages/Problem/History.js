import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import media from "../../Styles/media";
import {colors} from '../../Layouts/var';
import {Tab} from "semantic-ui-react";
import tinycolor from 'tinycolor2'

const HistoryContainer = styled.div`
    line-height: 1.4;
`

const HistoryList = styled.ul`
    padding: 0;
    margin: 0;
`

HistoryList.Item = styled.li`
    position: relative;
    background: #fff;
    list-style: none;
    border-left: 2px solid ${props=> props.status==='success' ? colors.green : props.status==='error' ? colors.red : colors.yellow}
    border-bottom: 1px solid #e1e1e7;
    font-size: 14px;
    margin-bottom: 2em;
    ${media.phone`
        font-size: 10px;
    `}
    &:after{
        display: block;
        content: "";
        height: 5em;
        width: 2px;
        background: #cfcfd1;
        position: absolute;
        top: 100%;
        left: 0;
        margin-left: 5%;
    }
    &:last-of-type{
        &:after{
            display: none;
        }
    }
`
HistoryList.Item.Container = styled.div`
    display: flex;
    padding: 0 1em;
`
HistoryList.Item.Elem = styled.div`
    width: 6em;
    height: 6em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #959599;
    font-weight: 100;
    ${props => props.stretch ? 'flex: 1;' : ''}
`

HistoryList.Detail = styled.div`
    padding: 0 4em;
    margin-bottom: 2em;
`
HistoryList.Detail.Pane = styled.div`
    overflow: auto;
    max-height: calc(100vh - 25em);
    ${media.phone`
        max-height: calc(100vh - 40em);
        margin-left: -2em;
        margin-right: -2em;
        padding: 0 2em;
    `}
    font-size: 1rem;
`

const TestCase = styled.div`
    margin-bottom: 1rem;
`
TestCase.Title = styled.div`
    display:flex;
    padding: .5rem .3rem;
    margin-bottom: .5rem;
    border-bottom: 1px solid #f1f1f5;
    justify-content: space-between;
    &:before{
        content: "${props=>props.title}";
        color: #959595;
    }
    &:after{
        content: "${props=>props.score}points";
        color: ${props=>props.perfect ? tinycolor(colors.green).darken(20).toString() : colors.red};
    }
`
TestCase.Result = styled.div`
    display: flex;
    line-height: 2;
    &>*{
        flex:1;
        justify-content: center;
        text-align:center;
        font-size: .8rem;
        color: #959595;
    }
`


const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const SubmitScore = ({score}) => {
    return (
        <HistoryList.Item.Elem>
            <span style={{fontSize:'3em'}}>{score}</span>
        </HistoryList.Item.Elem>
    )
}

const SubmitInfo = ({title, contents}) => {
    return (
        <HistoryList.Item.Elem>
            <div style={{fontSize:'0.8em'}}>{title}</div>
            <div style={{fontSize:'1.5em'}}>{contents}</div>
        </HistoryList.Item.Elem>
    )
}

const SubmitStatusMessage = ({message}) => {
    return (
        <HistoryList.Item.Elem stretch={true}>
            <span style={{fontSize:'1.7em', width:'100%', paddingLeft:'1em'}}>{message}</span>
        </HistoryList.Item.Elem>
    )
}

const SubmitDetail = () => {
    const panes = [
        { menuItem: 'Tab 1', render: () =>
                <HistoryList.Detail.Pane>
                    <TestCase>
                        <TestCase.Title title={'dfd'} score={10} perfect={true}/>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>
                        <TestCase.Result>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </TestCase.Result>

                    </TestCase>

                </HistoryList.Detail.Pane> },
        { menuItem: 'Tab 2', render: () => <HistoryList.Detail.Pane attached={false}>Tab 2 Content</HistoryList.Detail.Pane> },
    ]
    return (
        <div>
            <Tab menu={{ text: true }} panes={panes} />
        </div>
    )
}

const HistoryItem = ({source, active, viewDetail, index}) => {
    const {status, score, message, memory, time, size } = source;
    const handleClick = () => {
        viewDetail(index);
    }
    return (
        <HistoryList.Item status={status} onClick={handleClick}>
            <HistoryList.Item.Container>
                <SubmitScore score={score}/>
                <SubmitStatusMessage message={message}/>
                <SubmitInfo title={'메모리'} contents={memory}/>
                <SubmitInfo title={'수행시간'} contents={time}/>
                <SubmitInfo title={'코드길이'} contents={size}/>
            </HistoryList.Item.Container>
            {active && (
                <HistoryList.Detail>
                    <SubmitDetail/>
                </HistoryList.Detail>
            )}


        </HistoryList.Item>
    )
}


class HistoryView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            active: -1,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(index){
        this.setState({active: index})
    }

    render(){
        const source = {
            status:'success',
            score:70,
            message:'hello',
            memory:'30M',
            time:'170ms',
            size:'18K'
        }
        return(
            <HistoryContainer>
                <HistoryList>
                    {[1,2,3].map(i=>(
                        <HistoryItem key={i} index={i} active={this.state.active==i} viewDetail={this.handleClick} source={source}/>
                    ))}

                </HistoryList>
            </HistoryContainer>
        )
    }
}

const History = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryView);

export default History;