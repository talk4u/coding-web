import React from 'react'
import ReactDOM from 'react-dom'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Circle.css';
import styled from 'styled-components'
import {connect} from "react-redux";
import {Link, Route} from 'react-router-dom'
import {gymListFetchRequested} from "../../../actions/gym";

const GymItem = styled(Link)`
    width: 240px;
    height: 240px;
    border-radius: 4px;
    background-color: #fff;
    border-bottom: 1px solid #e1e1e7;
    margin: 20px;
    font-size: 14px;
    padding: 1em;
    transition: all .2s;
    display:flex;
    color: #6B29FB;
    &:hover{
        background: #6B29FB;
        color: #fff;
        transform: scale(1.1);
    }
`
GymItem.Title = styled.div`
    font-size: 18px;
    align-self: flex-end;
    text-align: center;
    word-wrap: break-word;
    width: 100%;
`
GymItem.CircleContainer = styled.div`
    padding: 2em;
`
const GymContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
`

const mapStateToProps = (state, ownProps) => {
    return {
        gyms: state.gymReducer.list.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGym: () => dispatch(gymListFetchRequested())
    }
}

export class GymListView extends React.Component{
    constructor(props) {
        super(props)
        this.props.fetchGym()
    }

    render(){
        const {match} = this.props;
        const {gyms} = this.props;
        return(
            <GymContainer>
                { gyms!==null &&
                    gyms.map(g=>
                    <GymItem to={`${match.url}/${g.id}`} className={'gym__item'}>
                        <GymItem.Title>
                            <GymItem.CircleContainer>
                                <CircularProgressbar
                                    percentage={Math.round(g.problem_solved_count/g.problem_total_count*100)}
                                    strokeWidth={4}
                                    initialAnimation={true}
                                />
                            </GymItem.CircleContainer>
                            {g.name}

                        </GymItem.Title>
                    </GymItem>)}
            </GymContainer>
        )
    }


}

const GymList = connect(mapStateToProps, mapDispatchToProps)(GymListView)
export default GymList