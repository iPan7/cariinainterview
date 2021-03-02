import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { View } from "react-native";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CopyLink from "@material-ui/core/Link";
import cariinalogo from "./cariinalogo.svg";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
  heroButtons: {
    marginTop: theme.spacing(4),
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

class Landing extends Component {
  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <main>
            {/* Hero unit */}
            <View className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                >
                  Welcome to Cariina Forms!
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This application allows you to create forms for your school's daily operations. Create custom permission slips, class surveys, sign up sheets, grading rubrics, lesson plans, and more!
            </Typography>
              </Container>
            </View>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography align="center" gutterBottom>
              <img src={cariinalogo} alt="cariina logo" />
            </Typography>
            <WhiteTextTypography
              variant="subtitle1"
              align="center"
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

export default withStyles(styles)(Landing);
