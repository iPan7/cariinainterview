import React, { Component, useState, useEffect } from 'react';
import { Image, ScrollView, Text} from 'react-native';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CopyLink from '@material-ui/core/Link';
import cariinalogo from './cariinalogo.svg';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

require('default-passive-events');

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
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
    <WhiteTextTypography variant="body2" align="center">
      {'Copyright © '}
      <CopyLink color="inherit" href="https://www.cariina.com/">
        Cariina
      </CopyLink>{' '}
      {new Date().getFullYear()}
      {''}
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
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
      main: '#0e3869',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});

const getForms = async () => {
  try {
      const forms = await axios.get('/api/forms');
      return forms;
  } catch (err) {
      console.log(err)
  }
} 

const deleteForm = async (_id) => {
  try {
    return axios.delete(`/api/forms/${_id}`)
  } catch (err) {
      console.log(err)
  }
}

const makePrivate = async (id, formData) => {
  try {
      await axios.patch(`/api/forms/${id}`, formData)
  } catch (err) {
      console.log(err)
  }
}   

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = (props) => {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = styles(theme);

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false)
  };

  useEffect(() => {
    getForms().then(({data}) => {
      setForms(data.reverse())
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <main>
        <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              Your share link has been copied!
            </Alert>
          </Snackbar>
        {/* Hero unit */}
        <div className={classes.heroContent} >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Welcome to the Dashboard!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button component={Link} to={'/forms/new'} variant="contained">
                    Create New Form
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {forms.map((card) => (
              <Grid item key={card} xs={12} key={card._id}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.questions[0].label}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ul>
                    <Button size="small" color="primary" component={Link} to={`/forms/view/${card._id}`}>
                      View
                    </Button>
                    <CopyToClipboard text={`${window.location.origin}/forms/view/${card._id}`}>
                      <Button size="small" color="primary" onClick={handleClick}> 
                        Share
                      </Button>
                    </CopyToClipboard>
                    <Button size="small" color="primary" component={Link} to={`/forms/edit/${card._id}`}>
                      Edit
                    </Button>
                    <Button 
                    size="small" 
                    color="primary" 
                    onClick={() => {
                      deleteForm(card._id).then(res => {
                        getForms().then(({data}) => {
                          setForms(data.reverse())
                        })
                      })
                    }}
                    >
                      Delete
                    </Button>
                    <Button size="small" color="primary" onClick={() => {
                      makePrivate(card._id, {private: !card.private})
                      getForms().then(({data}) => {
                        setForms(data.reverse())
                      })
                    }}>
                      Make {card.private ? "Public" : "Private"}
                    </Button>
                    </ul>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography align="center" gutterBottom>
        <img src={cariinalogo} alt="cariina logo" />
        </Typography>
        <WhiteTextTypography variant="subtitle1" align="center" component="p">
        A suite of integrated school operations tools, helping administrators organize transportation, events, and extracurriculars
        </WhiteTextTypography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    </ThemeProvider>
  );

}

// class Dashboard extends Component {

//   state = {
//     forms: [],
//     open: false,
//   };  

//   handleClick = () => {
//     this.setState({open: true});
//   };

//   handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }

//     this.setState({open: false});
//   };

//   componentDidMount() {
//     getForms().then(({data}) => {
//       this.setState({forms: data.reverse()})
//     })
//   }
//   // componentDidUpdate() {
//   //   getForms().then(({data}) => {
//   //     this.setState({forms: data.reverse()})
//   //   })
//   // }

// render() {
//     const { classes } = this.props;
//   return (
//     <ThemeProvider theme={theme}>
//     <React.Fragment>
//       <CssBaseline />
//       <main>
//         <ScrollView>
//         {/* Hero unit */}
//         <div className={classes.heroContent} >
//           <Snackbar open={this.state.open} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={this.handleClose}>
//             <Alert onClose={this.handleClose} severity="info">
//               Your share link has been copied!
//             </Alert>
//           </Snackbar>
//           <Container maxWidth="sm">
//             <Typography component="h1" variant="h2" align="center" gutterBottom>
//               Welcome to the Dashboard!
//             </Typography>
//             <div className={classes.heroButtons}>
//               <Grid container spacing={2} justify="center">
//                 <Grid item>
//                   <Button component={Link} to={'/forms/new'} variant="contained">
//                     Create New Form
//                   </Button>
//                 </Grid>
//               </Grid>
//             </div>
//           </Container>
//         </div>
//         <Container className={classes.cardGrid} maxWidth="md">
//           {/* End hero unit */}
//           <Grid container spacing={2}>
//             {this.state.forms.map((card) => (
//               <Grid item key={card} xs={12} key={card._id}>
//                 <Card className={classes.card}>
//                   <CardContent className={classes.cardContent}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       {card.questions[0].label}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <ul>
//                     <Button size="small" color="primary" component={Link} to={`/forms/view/${card._id}`}>
//                       View
//                     </Button>
//                     <CopyToClipboard text={`${window.location.origin}/forms/view/${card._id}`}>
//                       <Button size="small" color="primary" onClick={this.handleClick}> 
//                         Share
//                       </Button>
//                     </CopyToClipboard>
//                     <Button size="small" color="primary" component={Link} to={`/forms/edit/${card._id}`}>
//                       Edit
//                     </Button>
//                     <Button 
//                     size="small" 
//                     color="primary" 
//                     onClick={() => {
//                       deleteForm(card._id).then(res => {
//                         getForms().then(({data}) => {
//                           this.setState({forms: data.reverse()})
//                         })
//                       })
//                     }}
//                     >
//                       Delete
//                     </Button>
//                     <Button size="small" color="primary" onClick={() => {
//                       makePrivate(card._id, {private: !card.private})
//                     }}>
//                       Make {card.private ? "Public" : "Private"}
//                     </Button>
//                     </ul>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//         </ScrollView>
//       </main>
//       {/* Footer */}
//       <footer className={classes.footer}>
//         <Typography align="center" gutterBottom>
//         <img src={cariinalogo} alt="cariina logo" />
//         </Typography>
//         <WhiteTextTypography variant="subtitle1" align="center" component="p">
//         A suite of integrated school operations tools, helping administrators organize transportation, events, and extracurriculars
//         </WhiteTextTypography>
//         <Copyright />
//       </footer>
//       {/* End footer */}
//     </React.Fragment>
//     </ThemeProvider>
//   );
// }
// }

export default withStyles(styles)(Dashboard);