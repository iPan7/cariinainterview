import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CopyLink from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import cariinalogo from "../cariinalogo.svg";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Pdf from "react-to-pdf";
import Draggable, { DraggableCore } from "react-draggable";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import { ReactFormGenerator } from 'react-form-builder2';
import $ from "jquery";
import axios from 'axios';
import {FormBuilder} from 'react-formio';
import {FormEdit} from 'react-formio';

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const formData = [
  {
    type: "header",
    subtype: "h1",
    label: "formBuilder in React"
  },
  {
    type: "paragraph",
    label: "This is a demonstration of formBuilder running in a React project."
  }
];

const ref = React.createRef();

const previewButton = document.getElementsByClassName('btn-dark')
console.log(previewButton)

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0E3869", // your color here
    },
  },
});

function Copyright() {
  return (
    <WhiteTextTypography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <CopyLink color="inherit" href="https://www.cariina.com/">
        Cariina
      </CopyLink>{" "}
      {new Date().getFullYear()}
      {""}
    </WhiteTextTypography>
  );
}

const items = [{
    key: "Header",
    name: "Header Text",
    static: !0,
    content: "Placeholder Text...",
  },
  {
    key: "Paragraph",
    name: "Paragraph",
    static: !0,
    content: "Placeholder Text...",
  },
  {
    key: "Checkboxes",
    canHaveAnswer: !0,
    name: "Checkboxes",
    icon: "fa fa-check-square-o",
    label: "Placeholder Label",
    field_name: "checkboxes_",
    options: [],
  },
  {
    key: "RadioButtons",
    canHaveAnswer: !0,
    name: "Multiple Choice",
    icon: "fa fa-dot-circle-o",
    label: "Placeholder Label",
    field_name: "radiobuttons_",
    options: [],
  },
  {
    key: "TextInput",
    canHaveAnswer: !0,
    name: "Single Line Text Input",
    label: "Placeholder Label",
    field_name: "text_input_",
  },
  {
    key: "NumberInput",
    canHaveAnswer: !0,
    name: "Number Input",
    label: "Placeholder Label",
    field_name: "number_input_",
  },
  {
    key: "TextArea",
    canHaveAnswer: !0,
    name: "Multi Line Text Input",
    label: "Placeholder Label",
    field_name: "text_area_",
  },
  {
    key: "Image",
    name: "Image",
    label: "",
    field_name: "image_",
    src: "",
  },
  {
    key: "DatePicker",
    canDefaultToday: !0,
    canReadOnly: !0,
    dateFormat: "MM/dd/yyyy",
    timeFormat: "hh:mm aa",
    showTimeSelect: !1,
    showTimeSelectOnly: !1,
    name: "Date/Time",
    label: "Placeholder Label",
    field_name: "date_picker_",
  },
];


const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  button: {
    margin: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    background: "#0e3869",
    padding: theme.spacing(6),
  },
  whitetext: {
    color: "white",
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#0e3869",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    page: {
      fontSize: 12,
      height: 200 /* You'll need to play with this value */,
    },
  },
});

class FormMaker extends Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  };

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <main>
            <div>
              <Container maxWidth="lg">
                <Box className={classes.page} ref={ref}>
                <FormBuilder
        options={{
          builder: {
            layout: false,
            premium: false,
            basic: {
              default: true,
              components: {
                password: false,
                radio: false,
                button: false
              }
            },
            advanced: {
              default: true,
              components: {
                signature: false
              }
            },
            data: false
          }
        }}
        form={{ display: "form" }}
        onChange={schema => console.log(schema)}
      />
                  {/* <ReactFormBuilder
                    url='path/to/GET/initial.json'
                    toolbarItems={items}
                    saveUrl='path/to/POST/built/form.json' 
                   /> */}
                </Box>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  <Button
                    component={Link}
                    to="/dashboard"
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                  >
                    Preview
                  </Button>
                  {/* <Pdf targetRef={ref} filename="SchoolForm.pdf">
                    {({ toPdf }) => (
                      <Button
                        className={classes.button}
                        color="primary"
                        onClick={toPdf}
                      >
                        Generate Pdf
                      </Button>
                    )}
                  </Pdf> */}
                </Typography>
              </Container>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography align="center" gutterBottom>
              <img src={cariinalogo} alt="cariina logo" />
            </Typography>
            <WhiteTextTypography
              variant="subtitle1"
              align="center"
              color="textPrimary"
              component="p"
            >
              A suite of integrated school operations tools, helping
              administrators organize transportation, events, and
              extracurriculars
            </WhiteTextTypography>
            <Copyright />
          </footer>
          {/* End footer */}
        </React.Fragment>
      </ThemeProvider>
    );
  }
  save(form){
    // you will receive form
    console.log(form);
}

updateForm(callback){
    // fetch form and set it to callback
    let form = axios
    callback(form)
}
}

export default withStyles(styles)(FormMaker);
