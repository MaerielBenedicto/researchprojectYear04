import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaPencilAlt} from 'react-icons/fa';

class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            postId: props.location.state.postId || '',
            title: props.location.state.title || '',
            body: props.location.state.body || '',
            mode: props.location.state.mode || 'create',
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleSubmitForm(e){
        //prevent from reloading page
        e.preventDefault();
        let token = this.props.user.token;
        if(this.state.mode === 'create'){
            e.preventDefault();
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
                this.props.render.getPosts();
                this.props.history.push('/posts/'+ response.data.data.id);   
              })
            .catch((error) => {
                if(error){
                    // console.log(error.response.data);
                    this.setState({errors: error.response.data});
                } 
            });  
        } else if(this.state.mode === 'edit'){
            e.preventDefault();
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
                this.props.render.getPosts();
                this.props.history.push('/posts/'+ response.data.id);   
              })
            .catch((error) => {
                // console.log(error);
                if(error){
                    this.setState({errors: error.response.data})
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

      goBack(){
        this.props.history.goBack();
      }

    render(){
        const errors = this.state.errors;
        return (
            <div className="body-content">
                <div className="container">
                    {/* Create Forum */}
                    <form onSubmit={this.handleSubmitForm}> 
                    <div className="row justify-content-center">
                        <div className="col-lg-9 create-title">
                            <h3><FaPencilAlt className="icon" /><b>Start a discussion</b></h3>
                        </div>
                        <div className="col-lg-9 forum-topic">
                            <h4>Title <span className="asterik">*</span></h4>
                            <input id="forum-title" type="text" className="form-control-forum" placeholder="Title" name="title" 
                            value={this.state.title}
                            onChange={this.handleChange} />
                            <span className="error">{errors.title}</span>
                        </div>
                        <div className="col-lg-9 forum-description">
                            <h4>Body <span className="asterik">*</span></h4>
                            <textarea className="form-control-forum-body col-12" rows="9" id="body" placeholder="Body" name="body"  
                            value={this.state.body}
                            onChange={this.handleChange}>
                            </textarea>
                            <span className="error">{errors.body}</span>
                        </div>
                        <div className="form-bttn col-9 mt-2">
                            <button className="submit-button btn-primary" type="submit">Submit</button>
                            {/* <button onClick={()=> this.goBack} className="cancel-button float-right btn-secondary">Cancel</button> */}
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