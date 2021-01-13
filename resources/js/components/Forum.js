import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Filter from './Filter';
import Vote from './Vote';



class Forum extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            forum: {},
            isLoaded: false,
            sort: ''
        };

        this.counted = this.counted.bind(this);
        
    }

    componentDidMount(){
        //get posts in a forum
        axios.get('/api/forums/' + this.props.match.params.forumId)
        .then(response => {
            console.log("THIS",response);
            
              //never modify state directly
              this.setState({
                posts: response.data.data,
                forum: response.data.forum,
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

    counted(post){
        
    }


    render(){
        if(this.state.isLoaded){
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
                                        <Vote postId={item.id} user={this.props.user} counted={this.counted}/>
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