import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";

const FIELDS = [
    {label: 'Form Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Form Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'}
];

class FormForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
        return <Field component={FormField} type="text" label={label} name={name}/>
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit((values) => console.log(values))}
        >
            {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "formForm",
})(FormForm);
