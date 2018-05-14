import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from "react-router-dom";

import GymList from './GymList'
import GymProblems from "./GymProblems";



export default class Gym extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {match} = this.props;
        return(
            <React.Fragment>
                <Route exact path={`${match.url}`} component={GymList}/>
                <Route exact path={`${match.url}/:gym_id`} component={GymProblems}/>
            </React.Fragment>
        )
    }
}