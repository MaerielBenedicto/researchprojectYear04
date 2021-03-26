import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';

class BookmarkLists extends Component {
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
                            {posts.length !== 0 && (
                                <h4 className="mt-1"><strong>Posts: </strong></h4>
                            )}
                            <table className="table table-bordered">
                                {posts.map(item => (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>
                                                <div className="bookmark-list">
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <img 
                                                                src={(item.user.image !== 'image.jpg' || undefined) ? ('../uploads/' + item.user.image) 
                                                                : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} 
                                                            />
                                                        </div>
                                                        <div className="col-10">
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
                                                            <p><span><strong>Forum: </strong>
                                                                <Link to={`/forums/${item.forum.id}`}>
                                                                    {item.forum.topic}
                                                                </Link> &nbsp;
                                                         </span> </p>
                                                            <p>
                                                                <strong>Posted on: </strong> 
                                                                <Moment format="DD/MM/YYYY">{item.created_at}</Moment>
                                                            </p>
                                                        </div>
                                                    </div>
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
                            {forums.length !== 0 && (
                                <h4 className="mt-1"><strong>Forums: </strong></h4>
                            )}
                            <table className="table table-bordered">
                                {forums.map(item => (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>
                                                <div className="bookmark-list">

                                                    <Link to={`/forums/${item.id}`}>
                                                        <h4>{item.topic}</h4>
                                                    </Link>
                                                    <p><span><strong>Posted on: </strong> 
                                                        <Moment format="DD/MM/YYYY">{item.created_at}</Moment></span>
                                                    </p>

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