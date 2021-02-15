import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import FormField from './FormField';

class FormForm extends Component {
    renderFields() {
        return(
            <div>
                <Field type="text" name="title" component={FormField} />
            </div>
        );
    }

    render() {
    return (
        <div>
            <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
            <Field
                type="text"
                name="formTitle"
                component="input"
            />
            <button type="submit">Submit</button>
            </form>
        </div>
    );
   }
};

export default reduxForm({
    form: 'formForm'
}) (FormForm);