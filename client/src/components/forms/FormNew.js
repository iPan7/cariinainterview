//FormNew is a "container" of sorts that will show different fillable forms depending on what is appended

import React, { Component } from 'react';
import FormForm from './FormForm';

class FormNew extends Component {
    render() {
    return (
        <h1>
            <FormForm />
        </h1>
    );
   }
};

export default FormNew;