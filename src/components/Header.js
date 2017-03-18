import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {

        var user;

        if(this.props.user && this.props.user.username && this.props.user.username !== 'annon') {
            user = (<Link to={'/user/'+this.props.user._id} id='user' style={{textDecoration:'none',color:'hotpink','alignSelf':'center'}}><h1>{this.props.user.username}</h1></Link>)
        } else {
            user = (<Link to='/login'  id='user' style={{textDecoration:'none',color:'hotpink','alignSelf':'center'}}><h1>Login</h1></Link>)
        }

        return (
            <div id='header'>
                <Link to='/' id='home' style={{textDecoration:'none',color:'hotpink','alignSelf':'center'}}><h1>HOME</h1></Link>
                <h1 id='title' >Poll-Star</h1>
                {user}
            </div>
        );
    }
}