import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import AddComment from '../AddComment';
import Comments from '../Comments';
import PostVote from '../PostVote';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';


class Post extends Component {
    constructor(){
        super();
        this.state = {
            post: {},
            isLoaded: false,
            sortby: 'Latest'
        };

        this.delete = this.delete.bind(this);
        this.getPost = this.getPost.bind(this);
    }

    componentDidMount(){
        this.getPost();
    }

    getPost(){
        axios.get('/api/posts/' + this.props.match.params.id)
        .then(response => {    
            if(response.data.data.action === "under review"){
                this.setState({
                    hide: true
                });
            }
            this.setState({
                post: response.data.data,
                isLoaded: true
            });
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    delete() {
        let token = localStorage.getItem("token");
        axios.delete('/api/posts/' + this.props.match.params.id,
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            // console.log(response);
            this.props.history.push('/forums/'+ this.state.post.forum_id);   
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    render(){
        const addClass = this.state.hide ? 'hide-post' : '';
        const hideClass = this.state.hide ? '' : 'removeWarning';
        const user = this.props.user;
        const post = this.state.post;

        if(this.state.isLoaded){
            return (
                <div className="body-content">
                    <div className="container"> 
                   <div className="row">
                        <div className={'post-detail col-9 py-3 ' + addClass}>
                            <div className="row">
                                <div className="col-12">
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"/>
                                    <span> {post.user.name}</span>
                                    {(user && user.id === post.user.id) ? (
                                        <div>
                                    <Link to={{
                                        pathname: '/submit-post/' + this.props.match.params.id,
                                        state: {
                                            forumId: post.forum_id,
                                            postId: this.props.match.params.id,
                                            title: post.title,
                                            body: post.body,
                                            mode: 'edit'
                                        }}} >
                                            <span className="bttn float-right"><FaEdit className="icon" />Edit</span>
                                        </Link> 
                                        <button className="bttn float-right" onClick={this.delete}><FaTrashAlt className="icon"/>Delete</button>
                                        </div>
                                    ) : ''}
                                </div>
                                <div className="col-12">
                                    <h4>{post.title}</h4>
                                    <p>{post.body}</p>
                                    <div> Upvote {post.upvote} </div>
                                    <div> Downvote {post.downvote} </div>
                                </div>
                                <PostVote postId={post.id} user={user} voted={this.getPost}/>
                            </div>
                       </div>
                       <div className={"row " + hideClass}>
                                <div className={'col-6 warning-div'}>
                                    <p className="warning-text">This  post is currently under review as it may contain abusive language.  
                                        You are the only one that can view this post.  Edit this post or wait for admin approval. </p>
                                        <button onClick={()=> this.setState({hide: false})}>Close</button>
                                </div>
                            </div>
                    </div>
                    { !this.state.post.action == 'under review' && (
                        <Comments postId={this.props.match.params.id} user={user} />
                    )}  
                        
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    };
}

export default withRouter(Post);