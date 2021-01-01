import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Posts extends Component {
    render(){
        return (
            <div className="appointment-list item-list mb-3">
                {/* {this.props.posts.map(item => (
                <div className="pet-item col media py-3" key={item.forumsId}>
                    <div className="pet-info media-body">
                    <div className="pet-head d-flex">
                        <span className="pet-name">
                        {item.topic}
                        </span>
                    </div>

                    <div className="apt-notes">
                    {item.body}
                    </div>
                    </div>
                </div>
                ))} */}
           </div>
        )
    };
}

export default Posts;