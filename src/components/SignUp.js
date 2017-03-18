import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends React.Component {

    handleSubmit(event) {
        var _this = this;
        event.preventDefault();

        console.log('INSIDE SIGNUP HANDLESUBMIT');

        axios.post('/api/user/create_user', { 
            username: _this.refs.username.value, 
            password: _this.refs.password.value
        }).then(function(response) {
            console.log('SIGNUP RESPONSE: ', response.data);
            _this.props.handleLogin(response.data);
        });
    }

    render() {

        console.log('INSIDE SIGNUP: ', this.props.user.isLoggedIn);

        return (
            this.props.user.isLoggedIn ?
            <Redirect to='/' /> :
            <div className='form-container'>
                <h3>Sign Up</h3>
                <form onSubmit={this.handleSubmit.bind(this)} method='post' id='sign_up' className='form'>
                    <input type='text' name='username' ref='username' placeholder='username' autoFocus />
                    <input type='password' name='password' ref='password' placeholder='password' />
                    <button className='primary'  type='submit' form='sign_up'>SIGN UP</button>
                </form>
                <p>Already a user? <Link to='/login'>Login</Link></p> 
            </div>
        );
    }
}