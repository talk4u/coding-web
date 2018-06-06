import React from 'react'
import AppContent from "../../Layouts/AppContent";
import AppBar from "../../Layouts/AppBar";
import SignForm from "../../Organisms/SignForm";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}
const SignView = (props) => {
    const { from } = props.location.state || {from: { pathname: "/"}};
    const { isAuthenticated } = props;
    if( isAuthenticated ){
        return  <Redirect to={from}/>;
    }
    return(
        <React.Fragment>
            <AppBar>Coding Talk</AppBar>
            <AppContent>
                <SignForm  style={{maxWidth: '300px', height: '240px', margin:'20vh auto'}}/>
            </AppContent>
        </React.Fragment>
    )
}

const Sign = withRouter(connect(
    mapStateToProps,
)(SignView))
export default Sign
