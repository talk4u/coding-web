import React from 'react'
import {loginRequested} from "../../../actions/auth";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import styled, {css} from 'styled-components'
import Form from '../../Atoms/Form'
import overlayStyles from '../../Styles'
import Button from '../../Atoms/Button'
import {colors} from '../../Layouts/var'

export const SignPlane = styled(Form)`
    display: flex;
    flex-direction: column;
    padding: 1.6rem 2rem 1.2rem 2rem;
    background: #fff;
    ${overlayStyles.shadow}
`
const SignFormField = styled(Form.Field)`
    &&&{
        &:last-of-type{
            margin-bottom: auto;
            
        }
    }
`

const SignButton = styled(Button)`
    &&&{
        margin: 0;
        margin-top: 1em;
    }
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
        const {style, ...rest} = this.props;
        return(
            <SignPlane onSubmit={(e)=>{
                this.handleSubmit()
                e.preventDefault()
            }} style={style}>
                <SignFormField>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" placeholder="id" onChange={this.handleChange} autoFocus={true}/>
                </SignFormField>
                <SignFormField>
                    <label htmlFor="password">username</label>
                    <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                </SignFormField>
                <SignButton type="submit" color={colors.purple} fluid={true}>로그인</SignButton>
            </SignPlane>

        )
    }
}

const SignForm = connect(
    null,
    mapDispatchToProps
)(SignView)
export default SignForm
