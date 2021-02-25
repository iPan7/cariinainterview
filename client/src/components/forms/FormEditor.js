import React, { Component, createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { useHistory } from "react-router-dom";

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

// const history = useHistory();

const getFormById = async (id) => {
    try {
        const form = await axios.get(`/api/forms/${id}`);
        return form;
    } catch (err) {
        console.log(err)
    }
  } 

const FormEditor = (props) => {
    // const history = useHistory();
    const [questions, setQuestions] = useState([])
    const formId = props.match.params[0];

    let fb = createRef();
    useEffect(() => {
        getFormById(formId).then(({data}) => {
            const options = {
                formData: data.questions,
                onSave: (event, formData) => {   //Auto binds `this`
                
                    editForm(formId, {questions: formData});
                    props.history.push("/");
                
                    // Add form via addForm action
                    // this.props.addForm(newForm);
                    // console.log(formData);
                },
                disabledActionButtons: ['data'],
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