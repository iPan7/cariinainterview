import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

// cariina color code #0E3869
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0E3869", // your color here
    },
  },
});

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontSize: 35,
    flexGrow: 1,
    margin: theme.spacing(1, 1.5),
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0e3869',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
      // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
}));



export const Header = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar  className={classes.toolbar}>
          <Typography id="title" component={Link} to={'/'} variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            CARIINA FORMS
          </Typography>
          <nav>
          <Button id="login" component={Link} to={'/auth/google'} variant="h6 button" color="textPrimary" href="#" className={classes.link}>
              LOGIN
            </Button>
            <Button id="dashboard" component={Link} to={'/dashboard'} variant="h6 button" color="textPrimary" href="#" className={classes.link}>
              DASHBOARD
            </Button>
            <Button id="newform" component={Link} to={'/forms/new'} variant="h6 button" color="textPrimary" href="#" className={classes.link}>
              CREATE NEW FORM
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
      </ThemeProvider>)
};