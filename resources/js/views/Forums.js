import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Posts/Post';
import Forum from '../components/PostList';
import Filter from '../components/Filter';
import Bookmark from '../components/Bookmark';
import ForumTable from '../components/ForumTable';
import SideLinkPosts from '../components/SideLinkPosts';
import Pagination from '../components/Pagination';

import '../../css/app.css';

import { Link } from 'react-router-dom';

class Forums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forums: [],
            isLoaded: false,
            sortby: 'Latest',
            search: null,
            currentPage: 1,
            forumsPerPage: 25
        };

        this.delete = this.delete.bind(this);
        this.changeSortby = this.changeSortby.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.paginate = this.paginate.bind(this);

    }

    //change page
    paginate(number) {
        this.setState({
            currentPage: number
        });
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

    //set search state
    onSearchChange(e) {
        const search = e.target.value;
        this.setState({ search: search });
    }

    render() {
        const forums = this.props.forums;
        const bookmarks = this.props.bookmarks;

        var filteredForums = [];
        if (this.state.sortby === 'Latest') {
            filteredForums = forums.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (this.state.sortby === 'Oldest') {
            filteredForums = forums.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (this.state.sortby === 'Popular') {
            filteredForums = forums.slice().sort((a, b) => b.postsCount - a.postsCount);
        }


        filteredForums = filteredForums.filter(forum =>
            (this.state.search === null) || (forum.topic.includes(this.state.search)) ||
            (forum.description.includes(this.state.search))
        );

        if (this.props.user) {
            //set bookmarked forums
            filteredForums = filteredForums.map((forum, i) => {
                if (bookmarks.some(bookmark => bookmark.id === forum.id)) {
                    forum.bookmarked = true;
                } else {
                    forum.bookmarked = false;
                }
                return forum;
            });
        }

        //youtube = https://www.youtube.com/watch?v=IYCa1F-OWmk&ab_channel=TraversyMedia
        const indexOfLastPost = this.state.currentPage * this.state.forumsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.forumsPerPage;
        const currentFilteredForums = filteredForums.slice(indexOfFirstPost, indexOfLastPost);


        return (

            <div>
                <div className="col-12">
                    <Filter
                        sortby={this.state.sortby}
                        changeSortby={this.changeSortby}
                        onSearchChange={this.onSearchChange}
                        search={this.state.search}
                    />
                </div>
                {/* <div className="row forum-list-div"> */}
                    <div className="container">
                        <div className="row ml-0 mb-3">

                            {/* <div className="forum-list col-12 col-lg-9 col-sm-12 col-md-12 order-1 order-sm-last order-md-1 py-3"> */}
                                <div className="col-lg-9">
                                    {currentFilteredForums.map(item => (
                                        <div key={item.id}>
                                            <ForumTable
                                                item={item}
                                                user={this.props.user}
                                                AddbookmarkSuccess={this.props.AddbookmarkSuccess}
                                                RemovebookmarkSuccess={this.props.RemovebookmarkSuccess}
                                                delete={this.delete}
                                            />
                                        </div>
                                    ))}
                                </div>
                            {/* </div> */}

                            <div className="col-12 col-lg-3 col-sm-12 col-md-12 col-xs-12 order-sm-1 order-md-2 create-bttn">
                                <Link to={{
                                    pathname: '/forums',
                                    state: {}
                                }}>
                                    <button className="forum-bttn btn-primary">Create a new Forum topic</button>
                                </Link>
                                <SideLinkPosts
                                    posts={this.props.posts}
                                />
                            </div>
                        </div>
                        <Pagination postsPerPage={this.state.forumsPerPage} totalPosts={forums.length} paginate={this.paginate} />

                    </div>

                {/* </div> */}
            </div>
        )
    };
}

export default Forums;