import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Button, Icon, Loader, Modal} from "semantic-ui-react";
import {colors} from "../../Layouts/var";
import tinycolor from 'tinycolor2';
import {problemRankFetchRequested, problemSubmissionFetchRequested} from "../../../actions/problem.ignore";
import media from "../../Styles/media";
import moment from 'moment';
import CodeMirror from '../../Molecules/CodeMirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';

const RankWrapper = styled.div`
    padding: 0;
    margin: 0;
`

const RankItem = {
    Rank: styled.div`
        width: 5em;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        ${media.phone`
            width: 2em;
        `}
    `,
    Item: styled.div`
        display: flex;
        align-items: center;
        flex: ${props => props.weight ? props.weight : 1};
        padding: 0 1em;
        ${media.tablet`
            ${props => props.phone_hide ?'display: none;' : null}
        `}
    `,
    File: styled.div`
        display: flex;
        align-items: center;
        width: 5em;
        flex-shrink: 0;
        justify-content: center;
        border-bottom: 1px solid #e1e1e7;
    `
}

const RankList = styled.div`
    display: flex;
    flex-wrap: wrap;
    min-height: 48px;
    align-items: stretch;
    color: #959595;
    ${props => props.heading ?
    `padding: 0 5em;`
    :
    `margin-bottom: 1em;`
    }
    ${RankItem.Item}, ${RankItem.File} {
        ${props => props.heading ?
    `
            background: transparent;
            border-bottom: none;
            `
    :
    `
            background: #fff;
            border-bottom: 1px solid #e1e1e7;
            `
    }
    }
`

const FileButton = styled(Button)`
    &&{
        background: ${colors.purple};
        color: #fff;
        &:hover{
            background: ${tinycolor(colors.purple).lighten().toString()};
            color: #fff;
        }
    }
    
`

const EmptyMsg = styled.div`
    padding: 2em;
    color: #959595;
    font-size: 2em;
    text-align: center;
    
`


const mapStateToProps = (state, ownProps) => {
    return {
        rank: state.problemReducer.rank.data,
        submission: state.problemReducer.submission,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRank: (id) => dispatch(problemRankFetchRequested(id)),
        fetchSubmission: (problemId, submissionId) => dispatch(problemSubmissionFetchRequested(problemId, submissionId)),
    }
}


class RankView extends React.Component{
    constructor(props){
        super(props);
        const {problemId} = this.props;
        this.props.fetchRank(problemId);
    }

    render(){
        const {rank} = this.props;
        if(rank===null){
            return(
                <Loader active={true}/>
            )
        }else{
            console.log(this.props)
            return(
                <RankWrapper>
                    {
                        rank.length>0 ?
                            (
                                <React.Fragment>
                                    <RankList heading={true}>
                                        <RankItem.Item>푼사람</RankItem.Item>
                                        <RankItem.Item phone_hide={true}>메모리</RankItem.Item>
                                        <RankItem.Item>수행시간</RankItem.Item>
                                        <RankItem.Item phone_hide={true}>코드길이</RankItem.Item>
                                        <RankItem.Item phone_hide={true}>제출 날짜</RankItem.Item>
                                    </RankList>
                                    {
                                        rank.map((r,i) => {
                                            const time = moment(r.created_at);
                                            const created_str =`${time.get('year')} ${time.get('month')}/${time.get('date')} ${time.get('hour')}:${time.get('minute')}:${time.get('second')}`
                                            return (
                                                <RankList key={i}>
                                                    <RankItem.Rank>#{i+1}</RankItem.Rank>
                                                    <RankItem.Item>{r.user_name}</RankItem.Item>
                                                    <RankItem.Item phone_hide={true}>{Math.floor(r.memory_used_bytes/1024)}MB</RankItem.Item>
                                                    <RankItem.Item>{r.time_elapsed_seconds}s</RankItem.Item>
                                                    <RankItem.Item phone_hide={true}>{r.code_size}KB</RankItem.Item>
                                                    <RankItem.Item phone_hide={true}>{created_str}</RankItem.Item>
                                                    <RankItem.File>
                                                        <Modal dimmer={'inverted'}
                                                               trigger={<FileButton circular icon='code' onClick={()=>this.props.fetchSubmission(this.props.problemId, r.submission_id)} />}>
                                                            <Modal.Content>
                                                                {this.props.submission.loading ?
                                                                    <Loader active/>
                                                                    :
                                                                    this.props.submission.data!==null ?
                                                                    <CodeMirror
                                                                        value={this.props.submission.data.submission_code}
                                                                        options={{
                                                                            lineNumbers: true,
                                                                            height: '100%',
                                                                            mode: this.props.submission.data.lang,
                                                                            readOnly: true,
                                                                            fixedGutter: false
                                                                        }}
                                                                    />
                                                                        :null
                                                                }

                                                            </Modal.Content>

                                                        </Modal>
                                                    </RankItem.File>
                                                </RankList>
                                            )})
                                    }
                                </React.Fragment>
                            ):
                            (
                                <EmptyMsg>
                                    <Icon size={'large'} name={'trophy'}/>
                                    <div style={{marginTop: '1em'}}>제일 먼저 만점을 받아보세요</div>
                                </EmptyMsg>
                            )
                    }
                </RankWrapper>
            )
        }

    }
}

const Rank = connect(
    mapStateToProps,
    mapDispatchToProps
)(RankView);

export default Rank;