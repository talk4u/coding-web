import React from 'react'
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import AppBar from "../../Layouts/AppBar";
import AppContent from "../../Layouts/AppContent";

import styled, {ThemeProvider} from 'styled-components'
import {darkTheme} from "../../Layouts/AppBar/theme";
import {Route, withRouter, Redirect, Switch} from "react-router-dom";
import Gym from "../Gym";
import Problem from "../Problem/index.ignore";



const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export class PrivateView extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        this.props.logout()
    }
    render(){
        const {match} = this.props
        return(
            <React.Fragment>
                <ThemeProvider theme={darkTheme}>
                    <AppBar>logo<button onClick={this.logout}>Logout</button></AppBar>
                </ThemeProvider>

                <AppContent>
                    <Switch>
                        <Route path={`${match.url}gym`} component={Gym}/>
                        <Route path={`${match.url}problem`} component={Problem}/>
                        <Route component={()=>(<Redirect to={`${match.url}gym`}/>)}/>
                    </Switch>

                </AppContent>
            </React.Fragment>
        )
    }
}


const Private =  connect(
    null,
    mapDispatchToProps
)(PrivateView)
export default Private
