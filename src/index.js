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
import connect from "react-redux/es/connect/connect";
import {authVerify} from "./actions/auth";





const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAuth: (username, token) => dispatch(authVerify(username, token))
    }
}

export class RootView extends React.Component {
    constructor(props) {
        super(props)
        const initToken = localStorage.getItem('token')
        const initUsername = localStorage.getItem('username')
        if(initToken && initUsername){
            this.props.verifyAuth(initUsername, initToken)
        }
    }
    render() {
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {/*<Route exact path='/' component={Home}/>*/}
                        <Route exact path='/sign' component={Sign}/>
                        <PrivateRoute path='/' component={Private}/>
                        <Route component={()=>(<Redirect to={'/sign'}/>)}/>
                    </Switch>
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
