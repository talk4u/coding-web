import React from 'react'
import ReactDOM from 'react-dom'
import styled, {css} from 'styled-components'
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {gymDetailFetchRequested, gymListFetchRequested} from "../../../actions/gym";
import {Loader} from "semantic-ui-react";
import ScoreBar from "../../Molecules/ScoreBar";
import overlayStyles from '../../Styles';
import media from '../../Styles/media';

const Gym = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 3em 2em;
    ${media.desktop`
        padding: 2em 2em;
    `}    
    ${media.phone`
        padding: 2em 1em;
    `}
`
Gym.Title = styled.div`
    font-size:24px;
    margin-bottom: 30px;
    ${media.phone`
        text-indent: 1em;
        margin-bottom: .5em;
    `}
`

Gym.Info = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
`

const User = styled.span`
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-left: -16px;
    margin-right: 9px;
    color: #fff;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
    &:nth-child(1){
        background: #6b0dff;
        margin-left: 0;
        z-index: 3;
    }
    &:nth-child(2){
        background: #8a4dff;
        z-index: 2;
    }
    &:nth-child(3){
        background: #fcb629;
        z-index: 1;
    }
`

const ProblemsContainer = styled.div`
    margin-bottom: 100px;
`

const Problem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 4em;
    margin-bottom: 24px;
    background-color: #fff;
    font-size: 16px;
    padding: 2px 0 2px 2.3em;
    transition: all .1s;
    ${media.phone`
        padding: 2px 1em 2px 1em;
        height: auto;
        flex-wrap: wrap;
    `}
    &:hover{
        ${overlayStyles.shadow}
    }
`

Problem.Title = styled(Link)`
    display: flex;
    align-items: center;
    font-size: 16px;
    flex: 1;
    height: 100%;
    ${media.phone`
        width: 100%;
        flex-shrink: 0;
        height: 3em;
        text-indent: 2em;
    `}
`
Problem.Status = styled.span`
    
`
const ProblemInformation = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 6em;
    flex-shrink: 0;
    border-left: 1px solid #e1e1e7;
    height: 100%;
    &:first-of-type{
        border-left: 0;
    }
`
Problem.Info = styled.div`
    ${ProblemInformation}
    margin-right: 1em;
`
Problem.Action = styled(Link)`
    ${ProblemInformation}
    ${media.phone`
        font-size: 12px;
        flex: 1;
    `}
`
Problem.ActionContainer = styled.div`
    display: flex;
    ${media.phone`
        width: 100%;
        height: 3em;
        font-size: 10px;
        border-top: 1px solid #e1e1e7;
    `}
`
const Unsolved = Problem.extend`
    &:last-of-child:{
        margin-bottom: 100px;
    }
`

const mapStateToProps = (state, ownProps) => {
    let gym_to_props = {
        ...state.gymReducer.detail,
        data:{
            title: '',
            solved: [],
            unsolved: [],
            recently_showed_users: [],
        }
    }
    if(state.gymReducer.detail.data!==null){
        gym_to_props = {
            ...state.gymReducer.detail,
            data: {
                title: state.gymReducer.detail.data.name,
                solved: state.gymReducer.detail.data.problems.filter(p=>p.max_score===100),
                unsolved: state.gymReducer.detail.data.problems.filter(p=>p.max_score!==100),
                recently_showed_users: state.gymReducer.detail.data.recently_showed_users,
            }
        }
    }
    return {
        gym: gym_to_props,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGym: (gym_id) => dispatch(gymDetailFetchRequested(gym_id))
    }
}

export class GymProblemsView extends React.Component{
    constructor(props){
        super(props)
        const {gym_id} = this.props.match.params;
        this.props.fetchGym(gym_id);
    }

    render(){
        const {gym} = this.props;
        return(
            <Gym>
                {gym.loading ? (
                    <Loader active/>
                ) : (
                    <React.Fragment>
                        <Gym.Title>{gym.data.title}</Gym.Title>
                        <Gym.Info>
                            {gym.data.recently_showed_users.map((user, ui) => (
                                <User>{user.name[0]}</User>
                            ))}
                            {gym.data.recently_showed_users.length>3 ? `외 ${gym.data.recently_showed_users.length-3}명` : ''}이 풀고 있습니다.
                        </Gym.Info>
                        <ProblemsContainer>
                            {gym.data.unsolved.map(p=>
                                <Unsolved key={p.slug}>
                                    <Problem.Title to={`/problem/${p.id}`}>{p.name}</Problem.Title>

                                    <Problem.Info><ScoreBar style={{width:'80%'}} score={p.max_score}/></Problem.Info>
                                    <Problem.ActionContainer>
                                        <Problem.Action to={`/problem/${p.id}/rank`}>순위</Problem.Action>
                                        <Problem.Action to={`/problem/${p.id}/history`}>파일</Problem.Action>
                                    </Problem.ActionContainer>
                                </Unsolved>
                            )}
                        </ProblemsContainer>
                        <ProblemsContainer>
                            {gym.data.solved.map(p=>
                                <Unsolved key={p.slug}>
                                    <Problem.Title to={`/problem/${p.id}`}>{p.name}</Problem.Title>
                                    <Problem.Info><ScoreBar style={{width:'80%'}} score={p.max_score}/></Problem.Info>
                                    <Problem.ActionContainer>
                                        <Problem.Action to={`/problem/${p.id}/rank`}>순위</Problem.Action>
                                        <Problem.Action to={`/problem/${p.id}/history`}>파일</Problem.Action>
                                    </Problem.ActionContainer>
                                </Unsolved>
                            )}
                        </ProblemsContainer>
                    </React.Fragment>
                )}

            </Gym>


        )
    }


}

const GymProblems = connect(mapStateToProps, mapDispatchToProps)(GymProblemsView)
export default GymProblems