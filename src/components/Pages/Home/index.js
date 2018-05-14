import React from 'react'

import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'


const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

export const HomeView = ({isAuthenticated}) =>{
    return (
        <React.Fragment>
            {isAuthenticated ?
                <Redirect to="/gym"/>
                :
                <Redirect to="/sign"/>
            }
        </React.Fragment>

    )
}

const Home = connect(
    mapStateToProps,
)(HomeView)
export default Home
