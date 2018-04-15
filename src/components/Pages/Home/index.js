import React from 'react'

import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'


const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

const HomeView = ({isAuthenticated}) =>{
    return (
        <React.Fragment>
            {isAuthenticated ?
                <Redirect to="/protected"/>
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
