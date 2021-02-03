import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import AddComment from './AddComment';
import CommentVote from './CommentVote';

class Comments extends Component {
    constructor(){
        super();
        this.state = {
            comments: [],
            comment: {},
            comment_value: "",
            sort: '',
            edit: false,
            editId: ''
        };
        this.comments = this.comments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.editComment = this.editComment.bind(this);
    }

    componentDidMount(){
        this.comments();
    }

    comments(){
        axios.get('/api/posts/' + this.props.postId + '/comments')
        .then(response => {
            console.log(response);
            const tempComments = response.data.data;
            console.log(response.data.data);
            //never modify state directly
            this.setState({
                comments: tempComments
            });
        })
        .catch(function(error){
            if(error){
                console.log(error.response);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    addComment(comment){        
        let tempComments = this.state.comments;

        //push comment in the beginning of the array
        tempComments.unshift(comment);
        this.setState({
          comments: tempComments
        });
      }

      handleChange(e){
        // this.setState({sort: e.target.value});
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      deleteComment(id){
        let token = localStorage.getItem("token");
        axios.delete('/api/comments/' + id,
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            // console.log(response);
            this.comments();
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
      }

      editComment(id){
        console.log("EDIT")
        let token = localStorage.getItem("token");
        axios.put('/api/comments/' + id,
        {
            body: this.state.comment_value,
            post_id: this.state.comment.post_id,
            user_id: this.state.comment.user_id
        },
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            // console.log(response);
            this.comments();
            this.setState({edit:false, editId:'', comment_value:'', comment: ''});
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
      }

     


    render(){
        return (
            <div className="">
                {/* <PrivateRoute postId={this.props.postId} userId={this.props.user.id} addComment={this.addComment} component={AddComment}/> */}
                {/* <div className="row">
                     <div className="col comment-select">
                                <h6>Sort</h6>
                                <form>
                                    <select className="comment-select-button" value={this.state.sort} onChange={this.handleChange}>
                                        <option disabled value="">Sort by:</option>
                                        <option value="Popularity">Popularity</option>
                                        <option value="Latest">Latest</option>
                                    </select>
                                </form>
                            </div>
                    </div> */}
                <div className="row mt-5">
                        <div className="comment-box col-9 py-3">
                        <AddComment postId={this.props.postId} user={this.props.user} addComment={this.addComment}/>

                        {this.state.comments.map(item => (
                        <div key={item.id} className="each-comment">
                            <div className="media-body">
                                <div>
                                    {item.user.name}
                                </div>
                                {(this.state.edit == true && this.state.editId === item.id) ? (
                                    <div>
                                    <textarea className="comment-box form-control" id="body" placeholder="Add a comment" name="comment_value"  
                                        value={this.state.comment_value}
                                        onChange={this.handleChange}></textarea>
                                        <button onClick={ () => this.editComment(item.id)}>Update</button>
                                        <button onClick={ () => this.setState({edit: false})}>Cancel</button>
                                    </div>
                                ) : <div className="apt-notes">
                                        {item.body}
                                    </div>
                                    
                                }                                
                            </div>
                                <div> Upvote {item.upvote} </div>
                                <div> Downvote {item.downvote} </div>
                            {(this.props.user && this.props.user.id === item.user.id) ? (
                            <div className="float-right">
                             <button onClick={ () => this.deleteComment(item.id)}>Delete</button>
                             <button onClick={()=> this.setState({edit: true, editId: item.id, comment: item, comment_value: item.body})}>Edit</button>
                            </div>
                            ) : ''}

                            <CommentVote commentId={item.id} user={this.props.user} voted={this.comments}/>

                        </div>
                        
                        ))}
                        </div>
                    </div>
            </div>
        )
    };
}

export default Comments;