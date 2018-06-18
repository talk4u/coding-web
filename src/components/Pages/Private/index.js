import React from 'react'
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import AppBar from "../../Layouts/AppBar";
import AppContent from "../../Layouts/AppContent";

import styled, {ThemeProvider} from 'styled-components'
import {darkTheme} from "../../Layouts/AppBar/theme";
import {Route, Redirect, Switch, Link} from "react-router-dom";
import Gym from "../Gym";
import Problem from "../Problem/index.ignore";
import {Icon, Modal} from "semantic-ui-react";
import SignForm from "../../Organisms/SignForm";
import Button from "../../Atoms/Button/index.ignore";
import {colors} from "../../Layouts/var";
import Logo from "../../Atoms/Logo";
import LogoLetter from "../../Atoms/LogoLetter";
import media from '../../Styles/media';

const StyledMenu = styled(Link)`
    color: #fff;
`
const LogoutButton = styled(Button)`
    margin: 0 0 0 auto;
`
const StyledLogoLetter = styled(LogoLetter)`
    height: 3em;
    ${media.phone`
        height: 2em;
    `}
`
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
                    <AppBar>
                        <Switch>
                            <Route path={`${match.url}gym`} exact={true} component={()=><StyledLogoLetter/>}/>
                            <Route component={()=><StyledMenu to={`${match.url}gym`}><Icon name='arrow left'/>Go to GYM</StyledMenu>}/>
                        </Switch>

                        <LogoutButton onClick={this.logout} color={colors.purple} size={'tiny'}>Logout</LogoutButton>
                    </AppBar>
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
