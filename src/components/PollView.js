import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Doughnut from 'react-chartjs-2';
import randomColor from 'randomcolor';

export default class PollView extends React.Component {

    constructor(props) {
        super(props);

        var _this = this;

        //check list of polls and return the current pollID poll
        var poll = this.props.polls.filter(function(poll) {
            return poll._id === _this.props.pollID
        });

        poll = poll[0];

        //if poll is defined, check if this user has voted
        //this will be used to determine what is shown
        var voted = poll && poll.votes.indexOf(this.props.user._id) > -1;

        this.state = { 
            voted: voted,
            vote: undefined,
            categories: [], 
            poll: poll 
        };
    }

    handleVote(e) {
        console.log('OnChange: ', e.target.value);
        this.setState({vote: e.target.value});
    }

    handleSubmit(e) {

        console.log('Button onClick: ', this.state.vote);

        var _this = this;

        if(!this.state.vote) {
            console.log('No selection. Choose one to vote.');
        } else if(this.state.voted) {
            console.log('User already voted.');
        } else {
            console.log(this.state.poll.categories[this.state.vote] + ' selected.');

            axios.post('/api/poll/vote_poll', {poll_id: this.props.pollID, user_id: this.props.user._id, vote_index: this.state.vote})
            .then(function(response) {
                console.log(response);
                _this.props.update();
            })
        }
    }

    render() {

        var _this = this;

        console.log('STATE: ', this.state);
        console.log('User: ', this.props);

        //if incorrect poll ID display error message
        if(!this.state.poll) {
            return (
                <h3>Incorrect Poll ID</h3>
            );
        }

        //if voted, display the results
        if(this.state.voted) {

            var colors = randomColor({count: this.state.poll.counts.length});

            var data = {
                labels: this.state.poll.categories,
                datasets: [{
                    data: this.state.poll.counts,
                    backgroundColor: colors,
                    hoveBackgroundColor: colors
                }]
            };

            return (
                <div>
                    <h3>{this.state.poll.title}</h3>
                    <h4>You have voted</h4>
                    <Doughnut data={data} />
                    <br/>
                </div>
            );
        }

        //if not voted, display the vote form
        else {
            var categories = this.state.poll.categories.map(function(cat, i) {
                return (
                    <div key={i}>
                        <input type='radio' key={i} name={'choice'} value={i} />{cat}<br/>
                    </div>
                )
            })

            return (
                <div className={'flex-hori'} style={{'padding':'10px'}}>
                    <div className={'flex-vert'} style={{'margin':'auto'}}>
                        <h3>{this.state.poll.title}</h3>
                        <div onChange={this.handleVote.bind(this)} className='form' style={{'textAlign':'left','margin':'auto'}}>
                            {categories}
                            <br/>
                            <button onClick={this.handleSubmit.bind(this)} className='primary'>Vote</button>
                            <br/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}