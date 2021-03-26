import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Moment from 'react-moment';
import { FaTrashAlt, FaEllipsisH, FaEdit, FaCommentAlt } from 'react-icons/fa';
class BookmarkLists extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const posts = this.props.posts_bookmarks;
        const forums = this.props.forums_bookmarks;
        return (
            <div className="mt-2 body-m-bottom">
                <div className="container">
                    <div className="row">
                        <div className="posts-table col-lg-6">
                            {posts.length === 0 && (
                                <div className="p-4"><p> You currently do not have any bookmarked posts!</p></div>
                            )}
                            <table className="table table-bordered">

                                {posts.map(item => (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>
                                                <div>
                                                    {/* <h4>{item.title}</h4> */}
                                                    <Link to={{
                                                        pathname: `/posts/${item.id}`,
                                                        state: {
                                                            post: item,
                                                            prevPath: location.pathname
                                                        }
                                                    }} ><h4>{item.title}</h4></Link>
                                                    {item.action == 'under review' && (
                                                        <span className="warning-status"> Under Review</span>
                                                    )}
                                                    <p><span>Forum: {item.forum.topic}</span> | Posted on: <Moment format="DD/MM/YYYY">{item.created_at}</Moment></p>

                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                        <div className="posts-table col-lg-6">
                            {forums.length === 0 && (
                                <div className="p-4"><p> You currently do not have any bookmarked forums!</p></div>
                            )}
                            <table className="table table-bordered">

                                {forums.map(item => (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>
                                                <div>
                                                    <Link to={`/forums/${item.id}`}>
                                                        <h4>{item.topic}</h4>
                                                    </Link>
                                                    <p><span>Posted on: <Moment format="DD/MM/YYYY">{item.created_at}</Moment></span></p>

                                                    <p>{item.description}</p>

                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>

                        </div>
                    </div>

                </div>

            </div>
        )
    };
}

export default BookmarkLists;