import _ from 'lodash';
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {compose} from 'redux';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FormField from "./FormField";
import { withStyles } from '@material-ui/core/styles';
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#0E3869", // your color here
      },
    },
  });

const FIELDS = [
    {label: 'Form Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Form Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'}
];

const styles = (theme) => ({
    button: {
      marginRight: theme.spacing(2),
      },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#0e3869',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
    },
  });

class FormForm extends Component {
    
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
        return (
            <Field key={name} component={FormField} type="text" label={label} name={name}/>
        )
    });
  }

  render() {
    const { classes } = this.props;
    return (
        <ThemeProvider theme={theme}>
      <div>
        <form onSubmit={this.props.handleSubmit((values) => console.log(values))}>
            {this.renderFields()}
            <Button component={ Link } to="/dashboard" type="submit" variant="contained" className={classes.button} align="right" color="secondary">
                Cancel
            </Button>
            <Button type="submit" variant="contained" className={classes.button} align="right" color="primary">
                Next
            </Button>

        </form>
      </div>
      </ThemeProvider>);
  }
}

function validate(values) {
   const errors = {};

    if (!values.title) {
        errors.title = 'You must provide a title!';
        errors.subject = 'You must provide a subject!';
        errors.body = 'You must write in a form body!';
        errors.emails = 'Who will you be sending this form to?';
    }

   return errors;
}

// validates whether the data inputs into the form were done correctly

export default compose(
      withStyles(styles),
      reduxForm({
        validate,
        form: "formForm",
      }))(FormForm);