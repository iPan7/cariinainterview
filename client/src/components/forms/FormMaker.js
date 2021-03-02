import React, { Component, createRef } from 'react';
import $ from 'jquery';
import axios from 'axios';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

const saveForm = async (formData) => {
    try {
        await axios.post('/api/forms', formData)
    } catch (err) {
        console.log(err)
    }
} 
// same as below
// async function saveForm(formData) {
//   await axios.post('/api/forms', formData)  
// }

class FormMaker extends Component {
    
    state = {
        options: {
            formData: [
                {
                    type: 'header',
                    subtype: 'h1',
                    label: 'Untitled'
                }
            ],
            onSave: (event, formData) => {   //Auto binds `this`
                // onSave option is built into formBuilder. It is a click event that does a callback
                saveForm({questions: formData});
                this.props.history.push("/");
                // ^ calls this function and then redirects the user to the dashboard
                window.location.reload();
            },
            disabledActionButtons: ['data', 'clear'],
            disableFields: ['hidden']
    
        }
    };


    fb = createRef();
    componentDidMount() {
        $(this.fb.current).formBuilder(this.state.options);
    }
    render() {
        return (
                <div id="fb-editor" className="form" ref={this.fb} />
        );
    }
}

export default FormMaker;