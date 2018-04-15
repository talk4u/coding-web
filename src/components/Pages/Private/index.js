import React from 'react'
import { usersFetchRequested } from '../../../actions/user'
import { promisesFetchRequested, promisesCreateRequested } from '../../../actions/promises'
import connect from "react-redux/es/connect/connect";
import {logout} from "../../../actions/auth";

const mapStateToProps = (state, ownProps) => {
    return {
        promises: state.promiseReducer.retrieve,
        username: state.authReducer.username,
        userPK: state.authReducer.userPK,
        users: state.userReducer.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(usersFetchRequested()),
        fetchPromise: ({user1}) => dispatch(promisesFetchRequested({user1})),
        createPromise: ({sinceWhen,tilWhen,user1,user2}) => dispatch(promisesCreateRequested({sinceWhen,tilWhen,user1,user2})),
        logout: () => dispatch(logout())
    }
}

class PrivateView extends React.Component{
    constructor(props){
        super(props)
        this.props.fetchUsers()
        this.props.fetchPromise({user1:this.props.userPK})
        this.state = {
            sinceWhen: null,
            tilWhen: null,
            user2: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.logout = this.logout.bind(this)
    }
    handleSubmit(){
        const {sinceWhen, tilWhen, user2} = this.state
        this.props.createPromise({
            sinceWhen,
            tilWhen,
            user1: this.props.userPK,
            user2
        })
    }
    handleChange(e){
        e.persist()
        this.setState({[e.target.name]: e.target.value})
    }
    logout(){
        this.props.logout()
    }
    render(){
        const {promises, userPK, users} = this.props
        return(
            <React.Fragment>
                <button onClick={this.logout}>Logout</button>
                <h2>Make Promise</h2>
                <form onSubmit={(e)=>{
                    this.handleSubmit()
                    e.preventDefault()
                }}>
                    <label htmlFor="sinceWhen">sinceWhen</label>
                    <input type="datetime-local" name="sinceWhen" onChange={this.handleChange}/>
                    <label htmlFor="tilWhen">tilWhen</label>
                    <input type="datetime-local" name="tilWhen" onChange={this.handleChange}/>
                    <select name="user2" onChange={this.handleChange}>
                        {users.map((u,i)=>(
                            <option key={i} value={u.id}>{u.username}</option>
                        ))}
                    </select>
                    <button type="submit">확인</button>
                </form>

                <h2>Promises</h2>
                <h3>as inviter</h3>
                {promises.loading ? 'Loading...'
                    :
                    promises.data===null || promises.data.promises_as_inviter.length===0 ?
                        'Nothing'
                        :
                        <ul>
                            {promises.data.promises_as_inviter.map((p,i) => (
                                <li key={i}>
                                    <div>{p}</div>
                                </li>
                            ))}
                        </ul>
                }
                <h3>and as invitee</h3>
                {promises.loading ? 'Loading...'
                    :
                    promises.data === null || promises.data.promises_as_invitee.length === 0 ?
                        'Nothing'
                        :
                        <ul>
                            {promises.data.promises_as_invitee.map((p, i) => (
                                <li key={i}>
                                    <div>{p}</div>
                                </li>
                            ))}
                        </ul>
                }

            </React.Fragment>
        )
    }
}


const Private = connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateView)
export default Private
