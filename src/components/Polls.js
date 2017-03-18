import React from 'react';
import { Link } from 'react-router-dom';

export default class Polls extends React.Component {
    render() {

        console.log('INSIDE POLLS');

        var _this = this;
        var checkMark = <img src='/check_mark.png' height={'20px'} width={'20px'} style={{'margin':'0 10px'}} />;
        var happyFace = <img src='/happy_face.png' height={'20px'} width={'20px'} style={{'margin':'0 10px'}} />;

        var newPollLink = undefined;
        if(this.props.user.isLoggedIn) {
            newPollLink = (<div id='new-poll-link-box'><Link to='new_poll' style={{textDecoration:'none',color:'hotpink'}}><div id='new-poll-box' ><h3>NEW POLL</h3></div></Link></div>);
        }

        var polls = this.props.polls.map(function(poll, index) {
            var face = <div style={{'width':'40px'}} />;
            var check = <div style={{'width':'40px'}} />;
            //if current user has voted on poll, display a checkmark
            if(poll.created_by_id === _this.props.user._id)
                face = happyFace;
            if((poll.votes.filter((voter_id) => voter_id === _this.props.user._id))[0])
                check = checkMark;

            return (
                <div className='flex-hori' style={{'maxWidth':'800px','margin':'auto','padding':'10px'}} key={poll._id}>
                    <Link to={'/poll/' + poll._id} style={{'flex':1,textDecoration:'none',textAlign:'left','border':'1px solid lime','borderRadius':'10px','padding':'5px'}}><h3 style={{'flex':1}}>{poll.title}</h3></Link>{face}{check}<h4>{'Votes: ' + poll.totalVotes}</h4>
                </div>
            );
        });

        console.log(this.props.polls);
        return (

            <div>
                {newPollLink}
                {polls}
            </div>
        );
    }
}