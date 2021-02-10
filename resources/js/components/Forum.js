import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Filter from './Filter';
import PostVote from './PostVote';



class Forum extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            forum: {},
            isLoaded: false,
            sortby: 'Latest'
        };        

        this.getPost = this.getPost.bind(this);
        this.changeSortby = this.changeSortby.bind(this);
    }

    componentDidMount(){
        this.getPost();
    }

    getPost(){
        //get posts in a forum
        axios.get('/api/forums/' + this.props.match.params.forumId)
        .then(response => {
            console.log(response);
            
              //never modify state directly
              this.setState({
                posts: response.data.data,
                forum: response.data.forum,
                isLoaded: true
              });
        })
        .catch(function(error){
            if(error){
                console.log(error.response);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    changeSortby(sort){
        this.setState({sortby: sort});
    }

    render(){
        if(this.state.isLoaded){
            const posts = this.state.posts;

            var filteredPosts = [];
            if(this.state.sortby === 'Latest'){
                filteredPosts = posts.slice().sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
            } else if(this.state.sortby === 'Oldest'){
                filteredPosts = posts.slice().sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
            } else if(this.state.sortby === 'Popular'){
                filteredPosts = posts.slice().sort((a,b) => b.upvote - a.upvote);
            }

            return (
                <div>
                    <div className="col-12">
                      {/* <div> */}
                        <Filter sortby={this.state.sortby} changeSortby={this.changeSortby}/>      
                      {/* </div> */}
                    
                </div>   
                <div className="body-content forum-post-div">
                    <div className="container"> 
                    <div className="row">
                        <div className="col-9 py-3">
                            <div className="forum-detail col-12">
                                <div className="row">
                                <div className="col-10">
                                    <h4 className="title">{this.state.forum.topic}</h4>
                                    <p>{this.state.forum.description}</p>
                                </div>
                                <div className="col-2">
                                    <span>{this.state.forum.postsCount} posts</span>
                                </div>
                                </div>
                            </div>

                            <div className="posts-rows col-12">
                                {filteredPosts.map(item => (
                                    <div className="post" key={item.id}>
                                        <div className="post-title">
                                            <Link to={`/posts/${item.id}`} >
                                                {item.title}
                                            </Link>
                                        </div>
            
                                        <div className="post-body">
                                        {item.body}
                                        </div>
                                        <div> Upvote {item.upvote} </div>
                                        <div> Downvote {item.downvote} </div>

                                        {(this.props.user && this.props.user.id === item.user.id) ? ( 
                                            <Link to={{
                                            pathname: '/submit-post/' + this.props.match.params.forumId,
                                            state: {
                                                forumId: this.props.match.params.forumId,
                                                postId: item.id,
                                                title: item.title,
                                                body: item.body,
                                                mode: 'edit'

                                            }}} >
                                                <button className="bttn">Edit</button>
                                            </Link>
                                        ) : ''}
                                        <PostVote postId={item.id} user={this.props.user} voted={this.getPost}/>
                                    </div>
                                    
                                ))}
                            </div>
                       </div>
                       <div className="col-3 py-3"> 
                           <Link to={{
                                pathname: '/submit-post/' + this.props.match.params.forumId,
                                state: {
                                    forumId: this.props.match.params.forumId
                                }}} >
                                <button className="forum-bttn">Start a new discussion</button>
                              </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            )
        } else { return null; }
        
    };
}

export default withRouter(Forum);