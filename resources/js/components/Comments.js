import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import AddComment from './AddComment';
import CommentVote from './CommentVote';
import Moment from 'react-moment';
import { FaEdit, FaTrashAlt, FaCommentAlt, FaEllipsisV, FaComments } from 'react-icons/fa';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            comment: {},
            comment_value: "",
            sort: '',
            edit: false,
            editId: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.editComment = this.editComment.bind(this);
    }

    
    handleChange(e) {
        // this.setState({sort: e.target.value});
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    deleteComment(id) {
        let token = this.props.user.token;
        axios.delete('/api/comments/' + id,
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                this.props.getComments();
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.setState({errors: error.data});
                }
            });
    }

    editComment(id) {
        let token = this.props.user.token;
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
                this.setState({ edit: false});
                this.props.updateComment(response.data);
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.setState({errors: error.data});
                }
            });
    }


    render() {
        const user = this.props.user;
        var comments = this.props.comments;
        comments = comments.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        return (
            <div>    
                {/* <div className="row mt-5 ml-0"> */}
                    <div className="comment-box col-12 py-3">
                        <AddComment postId={this.props.postId} user={this.props.user} addComment={this.props.addComment} />

                        {comments.map(item => (
                            <div key={item.id} className="each-comment">
                                <div className="row comment-div">
                                    <div className="col-1">
                                        <img src={(item.user.image !== 'image.jpg' || undefined) ? ('../uploads/' + item.user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} />
                                    </div>
                                    <div className="col-10">
                                        <span> {item.user.name} </span>
                                        <p className="date"><Moment format="LL">{item.created_at}</Moment></p>
                                    </div>
                                    <div className="col-1">
                                        <CommentVote 
                                            commentId={item.id} 
                                            user={this.props.user} 
                                            voted={this.props.getComments} 
                                            item_upvote={item.upvote}  
                                            item_voted={item.voted} 
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    {(this.state.edit == true && this.state.editId === item.id) ? (
                                        <div className="col-10 offset-1">
                                            <textarea className="comment-box form-control" id="body" placeholder="Add a comment" name="comment_value"
                                                value={this.state.comment_value}
                                                onChange={this.handleChange}></textarea>
                                            <button className="update-bttn float-right mt-2" onClick={() => this.editComment(item.id)}>Save</button>
                                            <button className="cancel-bttn float-right mt-2" onClick={() => this.setState({ edit: false })}>Cancel</button>
                                        </div>
                                    ) : (<div className="col-10 offset-1">
                                            <p>{item.body}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {(!this.state.edit && user && user.id === item.user.id) ? (
                                            <div className="dropdown show float-right">
                                                <a className="btn actions-btn dropdown" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <FaEllipsisV className="icon" />
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <button className="dropdown-item drop-down-link edit-bttn"
                                                        onClick={() => this.setState({ edit: true, editId: item.id, comment: item, comment_value: item.body })}>
                                                        <span className="bttn"><FaEdit className="icon" />Edit</span>
                                                    </button>
                                                    <button className="dropdown-item drop-down-link edit-bttn"
                                                        onClick={() => this.deleteComment(item.id)}>
                                                        <span><FaTrashAlt className="icon" />  Delete </span>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                {/* </div> */}
            </div>
        )
    };
}

export default Comments;