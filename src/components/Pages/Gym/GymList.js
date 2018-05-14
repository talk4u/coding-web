import React from 'react'
import ReactDOM from 'react-dom'
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
                { gyms===null ? 'hello':
                    gyms.map(g=>
                    <GymItem to={`${match.url}/${g.gym_id}`}>
                        <GymItem.Title>
                            {g.name}
                        </GymItem.Title>
                    </GymItem>)}
            </GymContainer>
        )
    }


}

const GymList = connect(mapStateToProps, mapDispatchToProps)(GymListView)
export default GymList