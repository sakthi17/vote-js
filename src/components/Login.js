import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Login extends React.Component {

    handleSubmit(event) {
        var _this = this;
        event.preventDefault();

        console.log('INSIDE LOGIN HANDLESUBMIT');

        axios.post('/login', { 
            username: _this.refs.username.value, 
            password: _this.refs.password.value
        }).then(function(response) {
            console.log('LOGIN RESPONSE: ', response.data.response.message);
            _this.props.handleLogin(response.data);
            if(response.data.response.success === false) {
                _this.refs.username.value = '';
                _this.refs.password.value = '';
            }
        });
    }

    render() {

        console.log('INSIDE LOGIN: ', this.props.user.isLoggedIn);

        return (
            this.props.user.isLoggedIn ?
            <Redirect to='/' /> :
            <div className='form-container'>
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit.bind(this)} method='post' id='login' className='form'>
                    <input type='text' name='username' ref='username' placeholder='username' autoFocus />
                    <input type='password' name='password' ref='password' placeholder='password' />
                    <button className='primary' type='submit' form='login'>LOGIN</button>
                </form>
                <p>Not registered? <Link to='/sign_up'>Create an account</Link></p> 
            </div>
        );
    }
}