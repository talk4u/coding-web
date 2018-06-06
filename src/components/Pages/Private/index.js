import React from 'react'
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import AppBar from "../../Layouts/AppBar";
import AppContent from "../../Layouts/AppContent";

import styled, {ThemeProvider} from 'styled-components'
import {darkTheme} from "../../Layouts/AppBar/theme";
import {Route, Redirect, Switch} from "react-router-dom";
import Gym from "../Gym";
import Problem from "../Problem/index.ignore";
import {Modal} from "semantic-ui-react";
import SignForm from "../../Organisms/SignForm";
import Button from "../../Atoms/Button";
import {colors} from "../../Layouts/var";


const mapStateToProps = (state, ownProps) => {
    return {
        tokenValid: state.authReducer.token!==null
    }
}
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
        const {match, tokenValid} = this.props
        return(
            <React.Fragment>
                <ThemeProvider theme={darkTheme}>
                    <AppBar>Coding Talk<Button onClick={this.logout} color={colors.purple} size={'tiny'}>Logout</Button></AppBar>
                </ThemeProvider>

                <AppContent>
                    <Switch>
                        <Route path={`${match.url}gym`} component={Gym}/>
                        <Route path={`${match.url}problem/:id`} component={Problem}/>
                        <Route component={()=>(<Redirect to={`${match.url}gym`}/>)}/>
                    </Switch>
                    <Modal
                        open={!tokenValid}
                        basic
                        size='mini'
                    >
                        <Modal.Content>
                            <SignForm/>
                        </Modal.Content>
                        <Modal.Actions>
                        </Modal.Actions>

                    </Modal>
                </AppContent>
            </React.Fragment>
        )
    }
}


const Private =  connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateView)
export default Private
