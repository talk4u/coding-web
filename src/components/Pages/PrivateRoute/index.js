import React from 'react'
import connect from "react-redux/es/connect/connect";
import {Route, Redirect} from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

const PrivateRouteView = ({component: Component, isAuthenticated, ...rest}) => {
    return (
        <React.Fragment>
            {isAuthenticated ?
                <Route {...rest} render={props => (
                    <Component {...props}/>
                )}/>:
                <Redirect to={'/sign'}/>
            }
        </React.Fragment>

    )

}

const PrivateRoute = connect(
    mapStateToProps,
    null
)(PrivateRouteView)

export default PrivateRoute
