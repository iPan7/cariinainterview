import React, { Component } from "react";
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
import jquery from "jquery";

const ref = React.createRef();

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

class FormBuilder extends Component {
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

  // Code for adding element dynamically below

  state = {
    newtext: [],
    newmultitext: [],
  };

  addText() {
    this.setState({ newtext: [...this.state.newtext, ""] });
  }

  handleChange(e, index) {
    this.state.newtext[index] = e.target.value;

    // set the changed state
    this.setState({ newtext: this.state.newtext });
  }

  handleRemove(index) {
    //remove an item at the index
    this.state.newtext.splice(index, 1);

    console.log(this.state.newtext, "$$$$");

    //update the state
    this.setState({ newtext: this.state.newtext });
  }

  handleSubmit(e) {
    console.log(this.state, "$$$$");
  }

  // Code for adding an element dyamically above

  // state = {
  //   newmultitext: [],
  // };

  // addmultiText() {
  //   this.setState({ newtext: [...this.state.newmultitext, ""] });
  // }

  // handlemultiChange(e, index) {
  //   this.state.newmultitext[index] = e.target.value;

  //   // set the changed state
  //   this.setState({ newmultitext: this.state.newmultitext });
  // }

  // handlemultiRemove(index) {
  //   //remove an item at the index
  //   this.state.newmultitext.splice(index, 1);

  //   console.log(this.state.newmultitext, "$$$$");

  //   //update the state
  //   this.setState({ newtext: this.state.newmultitext });
  // }

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
                  <ReactFormBuilder />,
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
                  <Pdf targetRef={ref} filename="SchoolForm.pdf">
                    {({ toPdf }) => (
                      <Button
                        className={classes.button}
                        color="primary"
                        onClick={toPdf}
                      >
                        Generate Pdf
                      </Button>
                    )}
                  </Pdf>
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
}

export default withStyles(styles)(FormBuilder);
