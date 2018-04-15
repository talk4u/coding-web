import React from 'react'
import {loginRequested} from "../../../actions/auth";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: ({username, password}) => dispatch(loginRequested({username, password}))
    }
}

class SignView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit(){
        const {username, password} = this.state
        this.props.handleSubmit({
            username,
            password
        })
    }

    render(){
        const {isAuthenticated} = this.props
        return(
            <React.Fragment>
                {isAuthenticated ?
                    <Redirect to="/protected"/>
                    :
                    <form onSubmit={(e)=>{
                        this.handleSubmit()
                        e.preventDefault()
                    }}>
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" placeholder="id" onChange={this.handleChange}/>
                        <label htmlFor="password">username</label>
                        <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                        <button type="submit">로그인</button>
                    </form>
                }
            </React.Fragment>

        )
    }
}

const Sign = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignView)
export default Sign
