import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class NewPoll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: ['', ''],
            count: 2
        };
    }

    handleSubmit(event) {
        var _this = this;
        event.preventDefault();

        console.log('INSIDE NEWPOLL HANDLESUBMIT');

        //don't submit empty strings
        var prunedCategories = [];
        this.state.categories.forEach(function(cat) {
            if(cat) prunedCategories.push(cat);
        });

        console.log('Title: ', _this.refs.title.value);
        console.log('Categories: ', _this.state.categories);
        console.log('Pruned Categories: ', prunedCategories);

        //if list of categories is less than 2, don't submit
        if(prunedCategories.length < 2) {
            console.log('At least 2 categories required');
            return;
        }

        if(this.refs.title.value === '') {
            console.log('Title required');
            return;
        }

        axios.post('/api/poll/create_poll', { 
            title: _this.refs.title.value, 
            categories: prunedCategories,
            created_by_id: _this.props.user._id,
            created_by_username: _this.props.user.username
        }).then(function(response) {
            console.log('LOGIN RESPONSE: ', response.data);
            _this.props.handleUpdate();
        });
    }

    handleChange(i, e) {
        var cats = this.state.categories.slice();
        cats[i] = e.target.value;
        this.setState({categories: cats});
    }

    newCategory() {

        var categories = this.state.categories;
        categories.push('');
        var count = this.state.count + 1;

        this.setState({
            categories: categories,
            count: count
        });

    }

    deleteCategory(index) {

        console.log('INSIDE DELETE CATEGORY');

        if(this.state.count < 3)
            return;

        var categories = this.state.categories;
        categories.splice(index, 1);
        var count = this.state.count - 1;


        this.setState({
            categories,
            count
        });
    }

    render() {

        console.log('INSIDE NEWPOLL');

        var _this = this;
        var cats = [];

        console.log('NEWPOLL STATE: ', this.state.categories, this.state.count);

        cats = this.state.categories.map(function(cat, i) {
            return (
            <div key={i} style={{'width':'100%'}} className='flex-hori'>
                <input type='text' value={_this.state.categories[i]} onChange={_this.handleChange.bind(_this, i)} style={{'flex':1,'height':'20px'}} placeholder={'category'}/><button onClick={_this.deleteCategory.bind(_this, i)}>X</button>
            </div>
            );
        })

        console.log(cats);

        return (
            !this.props.user.isLoggedIn ?
            <Redirect to='/' /> :
            <div className='form-container'>
                <h3>New Poll</h3>
                <form onSubmit={this.handleSubmit.bind(this)} method='post' id='new_poll' className='form'>
                    Title<input type='text' name='title' ref='title' placeholder='title' autoFocus />
                    <p/>
                    Categories
                    {cats}
                    <button className='primary' type='button' onClick={this.newCategory.bind(this)} >Add New Category</button>
                    <p/>
                    <button className='primary' type='submit' form='new_poll'>CREATE POLL</button>
                    <p/>
                </form>
            </div>
        );
    }
}