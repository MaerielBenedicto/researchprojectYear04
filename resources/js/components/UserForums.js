import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class UserForums extends Component {
    constructor(){
        super();
        this.state = {
            forums: []
        };

        this.delete = this.delete.bind(this);
        this.forums = this.forums.bind(this);
    }

    componentDidMount(){
        this.forums();
    }

    forums(){
        //get user forums
        let token = this.props.user.token;
        axios.get('/api/profile/' + this.props.user.id + '/forums', 
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            this.setState({
                forums: response.data
            });
        })
        .catch(function(error){
            if(error){
                console.log(error.response);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    delete(id) {
        console.log("DELETE");
        let token = this.props.user.token;
        axios.delete('/api/forums/' + id,
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            console.log(response);
            this.forums();
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
            <div className="mt-4">
                <div className="container"> 
                    <h4>FORUMS</h4>
                    {this.state.forums.map(item => (
                        <div className="forum col-12"  key={item.id}>
                        <div className="forum-title">
                            <Link to={`/forums/${item.id}`} className="forum-title">
                                {item.topic}
                            </Link>
                        </div>

                        <Link to={{
                            pathname: '/forums',
                            state: {
                                forumId: item.id,
                                topic: item.topic,
                                description: item.description,
                                mode: 'edit'
                            }}}>
                          <div className="float-right bttn"> Edit </div>
                        </Link>

                            <button className="bttn float-right" onClick={ () => this.delete(item.id)}>Delete</button>

                        <div className="forum-desc">
                            { item.description}
                        </div>
                        <div className="forum-desc">
                            { item.postsCount} posts
                        </div>
                        
                    </div>                                 
                    ))}

                </div>
                
            </div>
        )
    };
}

export default UserForums;