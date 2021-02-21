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
            </div>
        )
    };
}

export default EditComment;