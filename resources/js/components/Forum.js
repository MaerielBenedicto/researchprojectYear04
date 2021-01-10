import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Forum extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            forum: {},
            isLoaded: false,
            sort: ''
        };
        
    }

    componentDidMount(){
        //get posts in a forum
        axios.get('/api/forums/' + this.props.match.params.id)
        .then(response => {
            // console.log(response.data);
            const tempPosts = response.data.data;
            const tempForum = response.data.forum;
              //never modify state directly
              this.setState({
                posts: tempPosts,
                forum: tempForum,
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


    render(){
        if(this.state.isLoaded){
            return (
                <div className="body-content">
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
                                    <span>128 Posts</span>
                                </div>
                                </div>
                            </div>
                                <div className="col-12 comment-select mb-3 ">
                                            <h6>Sort</h6>
                                            <form>
                                                <select className="comment-select-button">
                                                    <option disabled value="">Sort by:</option>
                                                    <option value="Popularity">Popularity</option>
                                                    <option value="Latest">Latest</option>
                                                </select>
                                            </form>
                                        </div>

                            <div className="posts-rows col-12">
                                {this.state.posts.map(item => (
                                    <div className="post" key={item.id}>
                                        <div className="post-title">
                                            <Link to={`/posts/${item.id}`} >
                                            {item.title}
                                            </Link>
                                        </div>
            
                                        <div className="post-body">
                                        {item.body}
                                        </div>
                                        <Link to={{
                                        pathname: '/submit-post/' + this.props.match.params.id,
                                        state: {
                                            id: this.props.match.params.id,
                                            postId: item.id,
                                            title: item.title,
                                            body: item.body,
                                            mode: 'edit'

                                        }}} >
                                            <button className="bttn">Edit</button>
                                        </Link>
                                    </div>
                                    
                                ))}
                            </div>
                       </div>
                       <div className="col-3 py-3"> 
                           <Link to={{
                                pathname: '/submit-post/' + this.props.match.params.id,
                                state: {
                                    id: this.props.match.params.id
                                }}} >
                                <button className="forum-bttn">Start a new discussion</button>
                              </Link>
                        </div>
                    </div>
                    </div>
                </div>
            )
        } else { return null; }
        
    };
}

export default withRouter(Forum);