import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaPencilAlt} from 'react-icons/fa';

class CreateForum extends Component {
    constructor(props){
        super(props);
        this.state = {
            topic: props.location.state.topic || '',
            description: props.location.state.description || '',
            mode: props.location.state.mode || 'create',
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm(e){
        //prevent from reloading page
        e.preventDefault();
        let token = this.props.user.token;
        if(this.state.mode === 'create'){
            
            //send post request
            axios.post('/api/forums', 
            {
                topic: this.state.topic,
                description: this.state.description,
                user_id: this.props.user.id
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                this.props.render.createForumSuccess(response.data.data);
                this.props.history.push('/forums/'+ response.data.data.id);   
              })
            .catch((error) => {
                if(error){
                    this.setState({errors: error.response.data});
                } 
            });   
        } else if(this.state.mode === 'edit') {

            //send update request
            axios.put('/api/forums/' + this.props.location.state.forumId, 
            {
                topic: this.state.topic,
                description: this.state.description,
                user_id: this.props.user.id
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                this.props.render.updateForumSuccess(response.data);
                this.props.history.push('/forums/'+ response.data.id); 
              })
            .catch((error) => {
                if(error){
                    this.setState({errors: error.response.data});
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
        const errors = this.state.errors;
        return (
            <div className="body-content">
                <div className="container">
                    {/* Create Forum */}
                    <form onSubmit={this.handleSubmitForm}> 
                    <div className="row justify-content-center">
                        <div className="col-lg-9 create-title">
                            <h3> <FaPencilAlt className="icon" />Create a Forum Topic</h3>
                            <p className="ml-2"><span className="asterik">*</span> &mdash; Required Fields</p>
                        </div>
                        <div className="col-lg-9 forum-topic">
                            <h4>Topic Title <span className="asterik">*</span></h4>
                            <input id="forum-title" type="text" 
                                className="form-control-forum" 
                                placeholder="Topic" name="topic"  
                                value={this.state.topic}
                                onChange={this.handleChange} 
                            />
                            <span className="error">{errors.topic}</span>
                        </div>
                        <div className="col-lg-9 forum-description">
                            <h4>Topic Description <span className="asterik">*</span></h4>
                            <textarea className="form-control-forum-body col-12 " 
                                rows="9" id="description" placeholder="Description" 
                                name="description"  
                                value={this.state.description}
                                onChange={this.handleChange}>
                            </textarea>
                            <span className="error">{errors.description}</span>

                        </div>
                        <div className="form-bttn mt-2 col-lg-9">
                            <button className="submit-button btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                    </form>
                    {/* END Create forum */}
                </div>
        </div>
        )
    };
}

export default withRouter(CreateForum);