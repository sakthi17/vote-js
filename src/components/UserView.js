import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class UserView extends React.Component {

    logout() {
        var _this = this;

        axios.post('/logout', {})
        .then(function(response) {
            console.log('LOGOUT component: ', response);
            _this.props.handleLogout();
        })
        .catch(function(err) {
            console.log('LOGOUT ERROR: ', err);
        })
    }

    handlePollDelete(pollID) {
        var response = confirm('Delete Poll?');
        var _this = this;
        if(response == true) {
            axios.post('/api/poll/delete_poll', { pollID: pollID, userID: this.props.user._id })
            .then(function(response) {
                console.log('HANDLE POLL DELETE response: ', response);
                _this.props.handleLogout();
            });
        }
    }

    handleAccountDelete() {
        var response = confirm('Delete Account?');
        var _this = this;
        if(response == true) {
            axios.post('/api/user/delete_user', { _id: _this.props.user._id })
            .then(function(response) {
                console.log(response);
                axios.post('/api/poll/delete_poll', { created_by_id: _this.props.user._id})
                .then(function(response) {
                    console.log(response);
                    _this.props.handleLogout();
                });
            });
        }
    }

    render() {
        var _this = this;
        var polls = [];
        this.props.polls.forEach(function(poll) {
            if(poll.created_by_id === _this.props.user._id)
                polls.push(
                    <div className='flex-hori' style={{'maxWidth':'800px','margin':'auto','padding':'10px'}} key={poll._id}>
                        <Link to={'/poll/' + poll._id} style={{textDecoration:'none'}}><h3 style={{'flex':1}}>{poll.title}</h3></Link><button className={'delete-poll'} onClick={_this.handlePollDelete.bind(_this, poll._id)} >X</button>
                    </div>
                );
        })

        if(polls.length === 0)
            polls = <h3>No polls created yet, why not <Link to='/new_poll' style={{textDecoration:'none'}}>create one?</Link></h3>;
        else
            polls.push(<div key='new_poll'><h3>Why not <Link to='/new_poll' style={{textDecoration:'none'}}>create another one?</Link></h3></div>)

        if(this.props.user.isLoggedIn) {
            return (
                <div>
                    <span className={'flex-hori'} style={{'maxWidth':'800px','margin':'auto','padding':'10px'}}>
                        <h1>{this.props.user.username}</h1>
                        <button className={'primary'} onClick={this.logout.bind(this)} >Logout</button>
                    </span>
                    <p/>
                    <h2>Polls Created</h2>
                    <hr/>
                    {polls}
                    <hr/>
                    <p/>
                    <button className='delete-account' onClick={this.handleAccountDelete.bind(this)}>**Delete Account**</button>
                    <p/>
                </div> 
            )
        } else {
            return <Redirect to='/' />
        }
    }
}