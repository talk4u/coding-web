import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import media from "../../Styles/media";
import {colors} from '../../Layouts/var';
import {Loader, Menu, Tab} from "semantic-ui-react";
import tinycolor from 'tinycolor2'
import {
    problemHistoryFetchRequested,
    problemJudgeFetchRequested,
} from "../../../actions/problem.ignore";
import {UnControlled as CodeMirror} from "react-codemirror2";

const HistoryContainer = styled.div`
    line-height: 1.4;
`

const HistoryList = styled.ul`
    padding: 0;
    margin: 0;
`
const colorToHex = {
    yellow: colors.yellow,
    green: colors.green,
    red: colors.red,
    purple: colors.purple,
}


const StyledTab = styled(Tab)`
    >.ui.text.menu{
        font-size:1em;
        margin-bottom: 0;
    }
`
const StyledMenuItem = styled(Menu.Item)`
    &&&{
        ${media.phone`
            flex: 1;
            text-align: center;
            justify-content: center;
            align-self: stretch !important;
        `}
        ${props => props.active ? `border-bottom: 1px solid #959597 !important;` : null}
    }
`
HistoryList.Item = styled.li`
    cursor: pointer;
    position: relative;
    background: #fff;
    list-style: none;
    border-left: 2px solid ${props=> colorToHex[props.status]}
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
    font-size: 1em;
    ${media.phone`
        padding: 0 2em;
    `}
`
HistoryList.Detail.Pane = styled.div`
    overflow: auto;
    max-height: calc(100vh - 25em);
    margin-left: -4em;
    margin-right: -4em;
    padding: 0 4em;
    ${media.phone`
        max-height: calc(100vh - 30em);g
        margin-left: -2em;
        margin-right: -2em;
        padding: 0 2em;
    `}
    ${props => props.wide ? `
        padding: 0 !important;
    ` :null}
    font-size: 1em;
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
        histories: state.problemReducer.history.data,
        judgeDetail: state.problemReducer.judge,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHistory:  (id) => dispatch(problemHistoryFetchRequested(id)),
        fetchJudge:  (problem_id, judge_id, submission_id) => dispatch(problemJudgeFetchRequested(problem_id, judge_id, submission_id)),
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

const SubmitDetail = ({source:{detail:{detail:test_cases}, file}}) => {
    const panes = [
        { menuItem: <StyledMenuItem key='tab1'>Tab1</StyledMenuItem>, render: () =>
                <HistoryList.Detail.Pane>
                    {test_cases.map((test, t_i)=>(
                        <TestCase>
                            <TestCase.Title title={`test ${t_i+1}`} score={test.score} perfect={test.score!==0}/>
                            {test.testcases.map((t_case, t_c_i) => (
                                <TestCase.Result key={t_c_i}>
                                    <span>{t_case.time_elapsed_seconds}</span>
                                    <span>{t_case.memory_used_bytes}</span>
                                    <span>{t_case.status}</span>
                                </TestCase.Result>
                            ))}
                        </TestCase>
                    ))}
                </HistoryList.Detail.Pane>
        },
        { menuItem:  <StyledMenuItem key='tab2'>Tab2</StyledMenuItem>, render: () =>
                <HistoryList.Detail.Pane wide={true} attached={false}>
                    <CodeMirror
                        value={file.submission_code}
                        options={{
                            lineNumbers:true,
                            height: '100%',
                            mode: 'text/x-java',
                            readOnly: true,
                            fixedGutter: false
                        }}
                    />
                </HistoryList.Detail.Pane>
        },
    ]
    return (
        <div onClick={(e)=>{e.stopPropagation()}}>
            <StyledTab menu={{ text: true }} panes={panes} />
        </div>
    )
}

const HistoryItem = ({summary, active, viewDetail, index, detail}) => {
    const {status, score, memory_used_bytes, time_elapsed_seconds, code_size, submission_id, id:judge_id } = summary;
    let message = "";
    let color = "yellow";
    let node = null;
    switch (status){
        case "ENQ":
            message = "채점 준비 중";
            color = "purple";
            break;
        case "IP":
            message = "처리 중";
            color = "purple";
            break;
        case "CTE":
            message = "컴파일 에러";
            color = "red";
            break;
        case "FAIL":
            message = "틀림";
            color = score===0 ? "red" : "yellow";
            break;
        case "ERR":
            message = "인터널 에러";
            color = "red";
            break;
        case "PASS":
            message = "축하행! ^0^";
            color = "green";
            break;
    }
    const handleClick = () => {
        viewDetail(index, judge_id, submission_id, node);
    }
    return (
        <HistoryList.Item innerRef={n => node=n} status={color} onClick={handleClick}>
            <HistoryList.Item.Container>
                <SubmitScore score={score}/>
                <SubmitStatusMessage message={message}/>
                <SubmitInfo title={'메모리'} contents={`${Math.floor(memory_used_bytes/1024/1024)}MB`}/>
                <SubmitInfo title={'수행시간'} contents={`${time_elapsed_seconds}ms`}/>
                <SubmitInfo title={'코드길이'} contents={`${Math.floor(code_size/1024)}KB`}/>
            </HistoryList.Item.Container>
            {active && (
                detail.loading ?
                    <Loader active={true}/> :
                    <HistoryList.Detail>
                        <SubmitDetail source={detail.data}/>
                    </HistoryList.Detail>
            )}


        </HistoryList.Item>
    )
}


class HistoryView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active: -1,
            activeNode: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.props.fetchHistory(this.props.problemId);
    }

    handleClick(index, judge_id, submission_id, node){
        const {problemId:problem_id} = this.props;
        this.props.fetchJudge(problem_id, judge_id, submission_id);

        this.setState((prevState)=>{
            return{
                active: prevState.active===index ? -1 : index,
                activeNode: prevState.active===index ? null : node,
            }
        })
    }

    componentDidUpdate(){
        if(this.state.activeNode!==null){
            window.scrollTo(0, this.state.activeNode.offsetTop-100)
        }
    }

    render(){
        const {histories, judgeDetail} = this.props;
        return(
            <HistoryContainer>
                <HistoryList>
                    {histories!==null &&
                    (
                        histories.map((judgeSummary, i)=>(
                            <HistoryItem key={i}
                                         index={i}
                                         active={this.state.active===i}
                                         viewDetail={this.handleClick}
                                         summary={judgeSummary}
                                         detail={judgeDetail}
                            />
                        ))
                    )}

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