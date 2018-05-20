import React from 'react'
import {loginRequested} from "../../../actions/auth";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import styled, {css} from 'styled-components'
import Form from '../../Atoms/Form'
import overlayStyles from '../../Styles'

export const SignPlane = styled(Form)`
    padding: 1rem 3rem;
    background: #fff;
    ${overlayStyles.shadow}
`


const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: ({username, password}) => dispatch(loginRequested({username, password}))
    }
}

export class SignView extends React.Component{
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
        return(

            <SignPlane onSubmit={(e)=>{
                this.handleSubmit()
                e.preventDefault()
            }}>
                <Form.Field>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" placeholder="id" onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">username</label>
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                </Form.Field>
                <button type="submit">로그인</button>
            </SignPlane>

        )
    }
}

const SignForm = connect(
    null,
    mapDispatchToProps
)(SignView)
export default SignForm
