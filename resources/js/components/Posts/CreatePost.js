import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            postId: props.location.state.postId || '',
            title: props.location.state.title || '',
            body: props.location.state.body || '',
            mode: props.location.state.mode || 'create'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm(e){
        //prevent from reloading page
        e.preventDefault();

        let token = this.props.user.token;
        console.log('user token',this.props.user.token);
        if(this.state.mode === 'create'){
            axios.post('/api/forums/' + this.props.location.state.forumId + '/posts', 
            {
                title: this.state.title,
                body: this.state.body,
                user_id: this.props.user.id,
                forum_id: this.props.location.state.forumId 
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data.data);
                this.props.history.push('/posts/'+ response.data.data.id);   
              })
            .catch((error) => {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });  
        } else if(this.state.mode === 'edit'){
            axios.put('/api/posts/' + this.state.postId, 
            {
                title: this.state.title,
                body: this.state.body,
                user_id: this.props.user.id,
                forum_id: this.props.location.state.forumId 
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data);
                this.props.history.push('/posts/'+ response.data.id);   
              })
            .catch((error) => {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });  
        }     
      }

    handleChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render(){
        return (
            <div className="body-content">
                <div className="container">
                    {/* Create Forum */}
                    <form onSubmit={this.handleSubmitForm}> 
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Start a discussion</h3>
                        </div>
                        <div className="col-lg-12 forum-topic">
                            <h3>Title</h3>
                            <input id="forum-title" type="text" className="form-control-forum" placeholder="Title" name="title" required 
                            value={this.state.title}
                            onChange={this.handleChange} />
                        </div>
                        <div className="col-lg-12 forum-description">
                            <h3>Body</h3>
                            <textarea className="form-control-forum-body col-12 mb-3" rows="9" id="body" placeholder="Body" name="body"  
                            value={this.state.body}
                            onChange={this.handleChange}>
                            </textarea>
                        </div>
                        <div className="form-bttn col-12">
                            <button className="submit-button" type="submit">Submit</button>
                        </div>
                    </div>
                    </form>
                    {/* END Create forum */}
                </div>
        </div>
        )
    };
}

export default withRouter(CreatePost);