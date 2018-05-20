/* REACT CORE */
import React from 'react';
import ReactDOM from 'react-dom';

/* REACT DEPENDENCIES */
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom'

/* STYLE */
import styled from 'styled-components'

/* COMPONENTS */
import { Home, Sign, Private, PrivateRoute } from './components/Pages'

/* SERVICES */
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import {connect} from "react-redux";
import {authVerify, logout} from "./actions/auth";
import {Dimmer, Loader} from "semantic-ui-react";





const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        authPending: state.authReducer.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAuth: (username, token) => dispatch(authVerify(username, token)),
        logout: () => dispatch(logout())

    }
}

export class RootView extends React.Component {
    constructor(props) {
        super(props)
        const {authPending} = this.props
        const initToken = localStorage.getItem('token')
        const initUsername = localStorage.getItem('username')
        if(initToken && initUsername){
            this.props.verifyAuth(initUsername, initToken)
        }else{
            this.props.logout()
        }
    }

    render() {
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <React.Fragment>
                        {this.props.authPending && (
                            <Dimmer active inverted>
                                <Loader active/>
                            </Dimmer>
                        )}
                        <Switch>
                            <Route exact path='/sign' component={Sign}/>
                            <PrivateRoute path='/' component={Private}/>
                            <Route component={()=>(<Redirect to={'/sign'}/>)}/>
                        </Switch>
                    </React.Fragment>
                </BrowserRouter>
            </Provider>
        )
    }
}

const Root = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootView)


ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
registerServiceWorker();

export default Root
