import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Polls from './Polls';
import PollView from './PollView';
import NewPoll from './NewPoll';
import UserView from './UserView';
import Login from './Login';
import SignUp from './SignUp';


import axios from 'axios';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: { isLoggedIn: false },
            polls: []
        };
    }

    componentDidMount() {
        console.log('APP ASYNC POLLS AND USER?');
        this.loadData();
    }

    handleLogin(login) {
        if(login.response.success) {
            this.setState( { user: {
                username: login.user.username,
                _id: login.user._id,
                admin: login.user.admin,
                isLoggedIn: login.user.isLoggedIn,
            }});
        }
    }

    handleLogout() {
        console.log('LOGOUT HANDLED?');
        this.loadData();
    }

    update() {
        console.log('DATA RELOADED');
        this.loadData();
    }

    loadData() {
        //get polls
        axios.get('/api/poll/read_polls')
        .then((response) => {
            this.setState({ polls: response.data });
        });

        //get user from token
        axios.get('/api/user/read_user')
        .then((response) => {
            console.log('LOADDATA USER: ', response);
            this.setState({ user: {
                    username: response.data.user.username,
                    _id:      response.data.user._id, 
                    admin:    response.data.user.admin,
                    isLoggedIn: response.data.user.isLoggedIn
                }
            });
        });

    }

    render() {

        //console.log(this.state.user, this.state.polls);

        var user = this.state.user;
        var polls = this.state.polls;

        return (
            <BrowserRouter>
                <div className='App'>
                    <Route path='/' component={ () => <Header user={user} /> } />

                    <Switch>
                        <Route path='/user/:userID' component={ 
                            ({ match }) => ( user._id !== match.params.userID ?
                                ( <Redirect to={'/'} /> ) :
                                ( <UserView user={user} polls={polls} handleLogout={this.handleLogout.bind(this)} /> ) ) } />
                        <Route path='/poll/:pollID' component={ ({ match }) => <PollView update={this.update.bind(this)}user={user} polls={polls} pollID={match.params.pollID} /> } />
                        <Route path='/new_poll' component={ () => <NewPoll user={user} handleUpdate={this.loadData.bind(this)} /> } />
                        <Route path='/login' component={ () => <Login user={user} handleLogin={this.handleLogin.bind(this)} /> } />
                        <Route path='/sign_up' component={ () => <SignUp user={user} handleLogin={this.handleLogin.bind(this)} /> } />
                        <Route path='/denied' render={ () => ( <h3>Access Denied</h3> ) } />
                        <Polls user={user} polls={polls}/>
                    </Switch>

                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}