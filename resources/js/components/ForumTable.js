import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

/*Components */
import Bookmark from './Bookmark';
import DeleteConfirmation from './Modal/DeleteConfirmation';

/*Icons */
import { FaListAlt, FaEdit, FaTrashAlt, FaEllipsisV } from 'react-icons/fa';

class ForumTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    render() {
        const item = this.props.item;
        const user = this.props.user;
        return (
            // <div className="row">
            <div className="forum col-lg-11" key={item.id}>
                <div className="row">
                    <div className="col-11 forum-title">
                        {/* <div className="forum-title"> */}
                        <Link to={`/forums/${item.id}`} className="forum-title">
                            {item.topic}
                        </Link>
                        {/* </div> */}
                    </div>
                    <div className="col-1">
                        {(user && user.id === item.user.id) ? (
                            <div className="dropdown show">
                                <a className="btn actions-btn dropdown" href="#" 
                                    role="button" id="dropdownMenuLink" data-toggle="dropdown" 
                                    aria-haspopup="true" aria-expanded="false">
                                    <FaEllipsisV className="icon" />
                                </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <button className="dropdown-item drop-down-link edit-bttn">
                                        <Link to={{
                                            pathname: '/forums',
                                            state: {
                                                forumId: item.id,
                                                topic: item.topic,
                                                description: item.description,
                                                mode: 'edit'
                                            }
                                        }}>
                                            <span className="bttn"><FaEdit className="icon" />Edit</span>
                                        </Link>
                                    </button>
                                    <button className="dropdown-item drop-down-link" 
                                        onClick={() => this.setState({ showModal: true, item: item })}>
                                        <span><FaTrashAlt className="icon" />  Delete </span>
                                    </button>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                    {/* </div> */}
                    <div className="forum-desc col-12 pl-4">
                        <span>{item.description}</span>
                    </div>
                    <div className="forum-actions col-12">
                        <FaListAlt className="icon post-icon" /> {item.postsCount} posts
                        <Bookmark
                            user={this.props.user}
                            id={item.id}
                            bookmarked={item.bookmarked}
                            forum_bookmark={true}
                            AddbookmarkSuccess={this.props.AddbookmarkSuccess}
                            RemovebookmarkSuccess={this.props.RemovebookmarkSuccess}
                        />
                    </div>
                </div>

                {/* DELETE FORUM */}
                {this.state.showModal && (
                    <DeleteConfirmation
                        user={user}
                        item={"forum"}
                        delete={() => this.props.delete(this.state.item)}
                        showModal={this.state.showModal}
                        closeModal={() => this.setState({ showModal: false })}
                    />
                )}
            </div>
        )
    };
}

export default ForumTable;