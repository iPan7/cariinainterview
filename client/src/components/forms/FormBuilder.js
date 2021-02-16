import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CopyLink from "@material-ui/core/Link";
import cariinalogo from "../cariinalogo.svg";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Pdf from "react-to-pdf";
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
  },
});

class FormBuilder extends Component {

  state = {
    newtext:[]
  }

  addText(){

    this.setState({newtext: [...this.state.newtext, "" ]})

  }

  handleChange(e, index){
    this.state.newtext[index] = e.target.value

    // set the changed state
    this.setState({newtext: this.state.newtext})
  }

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container maxWidth="lg">
                <Box ref={ref}>
                  Testing page to see if it saves PDF
                  {
  this.state.newtext.map((text, index)=>{
    return (
      <div key={index}>
        <input onChange={(e)=>this.handleChange(e, index)}
        value={text} />
      </div>
    )
  })
}
                </Box>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  <Button
                    onClick={(e) => this.addText(e)}
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                  >
                    Add Text
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    color="primary"
                  >
                    Add Fillable Field
                  </Button>
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
                    Save
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
