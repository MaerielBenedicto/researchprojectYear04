import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Comments extends Component {
    constructor(){
        super();
        this.state = {
            comments: []
        };
    }

    componentDidMount(){
        axios.get('/api/posts/'+ + this.props.postId + '/comments')
        .then(response => {
            // console.log(response.data.data);
            const tempComments = response.data;
            //never modify state directly
            this.setState({
                comments: tempComments
            });
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
            <div className="body-content">
                <div className="container"> 
                <h4>COMMENTS</h4>

                </div>
                <div className="row">
                        <div className="col-8 py-3">
                        {this.state.comments.map(item => (
                        <div key={item.id}>
                            <div className="media-body">
                                <div>
                                    {item.user.name}
                                </div>
                                <div className="apt-notes">
                                    {item.body}
                                </div>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
            </div>
        )
    };
}

export default Comments;