import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class EditComment extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="body-content">
                <div className="container">
                    <h4>CREATE FORUM</h4>

                </div>

                {/* POST  */}
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
                            }
                        }} >
                            <span className="bttn float-right"><FaEdit className="icon" />Edit</span>
                        </Link>
                        <button className="bttn float-right" onClick={this.delete}><FaTrashAlt className="icon" />Delete</button>
                    </div>
                ) : ''}


                {/* Commeng */}
                {(this.state.edit == true && this.state.editId === item.id) ? (
                    <div>
                        <textarea className="comment-box form-control" id="body" placeholder="Add a comment" name="comment_value"
                            value={this.state.comment_value}
                            onChange={this.handleChange}></textarea>
                        <button onClick={() => this.editComment(item.id)}>Update</button>
                        <button onClick={() => this.setState({ edit: false })}>Cancel</button>
                    </div>
                ) : (<div className="apt-notes">
                    {item.body}
                </div>
                    )}

                {(this.props.user && this.props.user.id === item.user.id) ? (
                    <div className="float-right">
                        <button onClick={() => this.deleteComment(item.id)}>Delete</button>
                        <button onClick={() => this.setState({ edit: true, editId: item.id, comment: item, comment_value: item.body })}>Edit</button>
                    </div>
                ) : ''}
            </div>
        )
    };
}

export default EditComment;