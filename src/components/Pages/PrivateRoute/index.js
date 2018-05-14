import React from 'react'
import {connect} from "react-redux";
import {Route, Redirect} from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

export const PrivateRouteView = ({component: Component, isAuthenticated, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props=>
                isAuthenticated ? (
                    <Component {...props}/>
                ):(
                    <Redirect
                        to={{pathname: "/sign",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )

}
const PrivateRoute = connect(
    mapStateToProps,
    null
)(PrivateRouteView)

export default PrivateRoute
