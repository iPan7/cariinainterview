import React, { Component, createRef, useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';

require('jquery-ui-sortable');
require('formBuilder/dist/form-render.min.js')

const getFormById = async (id) => {
    try {
        const form = await axios.get(`/api/forms/${id}`);
        return form;
    } catch (err) {
        console.log(err)
    }
  } 

const RenderedForm = (props) => {
    // const history = useHistory();
    const formId = props.match.params[0];

    useEffect(() => {
        getFormById(formId).then(({data}) => {
            const container = document.getElementById('fb-rendered-form');
            const formData = data.questions;
            const formRenderOpts = {
                container,
                formData,
                dataType: 'json'
              };
            $(container).formRender(formRenderOpts);
        })
    }, [])
    return (
        <div id="fb-rendered-form" className="form" />
    );
}

export default RenderedForm;