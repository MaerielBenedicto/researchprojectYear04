import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Posts/Post';
import Forum from '../components/Forum';
import Filter from '../components/Filter';
import Bookmark from '../components/Bookmark';
import ForumTable from '../components/ForumTable';

import '../../css/app.css';

import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forums: [],
            isLoaded: false,
            sortby: 'Latest'
        };

        this.delete = this.delete.bind(this);
        this.changeSortby = this.changeSortby.bind(this);
    }

    componentDidMount() {
        // this.forums();
    }

    delete(forum) {
        console.log("DELETE");
        let token = this.props.user.token;
        axios.delete('/api/forums/' + forum.id,
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                // console.log(response);
                this.props.onDeleteForum(forum);
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.state.errors = error.response.data.errors;
                }
            });
    }

    changeSortby(sort) {
        this.setState({ sortby: sort });
    }

    render() {
        const forums = this.props.forums;
        const bookmarks = this.props.bookmarks.forums;

        var filteredForums = [];
        if (this.state.sortby === 'Latest') {
            filteredForums = forums.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (this.state.sortby === 'Oldest') {
            filteredForums = forums.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (this.state.sortby === 'Popular') {
            filteredForums = forums.slice().sort((a, b) => b.postsCount - a.postsCount);
        }

        //set bookmarked forums
        filteredForums = filteredForums.map((forum, i) => {
            if (bookmarks.some(bookmark => bookmark.id === forum.id)) {
                forum.bookmarked = true;
            } else {
                forum.bookmarked = false;
            }
            return forum;
        });

        return (

            <div>
                <div className="col-12">
                    <Filter sortby={this.state.sortby} changeSortby={this.changeSortby} />
                </div>
                <div className="body-content forum-list-div">
                    <div className="container">
                        <div className="row item-list mb-3">

                            <div className="forum-list col-9 media py-3">
                                <div className="col-12">
                                    {filteredForums.map(item => (
                                        <div key={item.id}>
                                            <ForumTable item={item} user={this.props.user} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-3 py-3">
                                <Link to={{
                                    pathname: '/forums',
                                    state: {}
                                }}>
                                    <button className="forum-bttn">Create a new Forum topic</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    };
}

export default Home;