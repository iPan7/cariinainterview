import React, {createRef, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

const editForm = async (id, formData) => {
    try {
        await axios.patch(`/api/forms/${id}`, formData)
    } catch (err) {
        console.log(err)
    }
} 

const getFormById = async (id) => {
    try {
        const form = await axios.get(`/api/forms/${id}`);
        return form;
    } catch (err) {
        console.log(err)
    }
  } 

const FormEditor = (props) => {
    const formId = props.match.params[0];
    const fb = createRef();
    useEffect(() => {
        getFormById(formId).then(({data}) => {
            const options = {
                formData: data.questions,
                // onSave option is built into formBuilder. It is a click event that does a callback
                onSave: (event, formData) => {   //Auto binds `this`
                
                    editForm(formId, {questions: formData});
                    props.history.push("/");
                    // ^ calls this function and then redirects the user to the dashboard
                },
                disabledActionButtons: ['data', 'clear'],
                disableFields: ['hidden']
            };
            $(fb.current).formBuilder(options);
        })
    }, [])
    return (
        <div id="fb-editor" className="form" ref={fb} />
    );
}

export default FormEditor;