import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0E3869", // your color here
    },
  },
});

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

const getForms = async () => {
  try {
    const forms = await axios.get("/api/forms");
    return forms;
  } catch (err) {
    console.log(err);
  }
};

const deleteForm = async (_id) => {
  try {
    return axios.delete(`/api/forms/${_id}`);
  } catch (err) {
    console.log(err);
  }
};

const makePrivate = async (id, formData) => {
  try {
    await axios.patch(`/api/forms/${id}`, formData);
  } catch (err) {
    console.log(err);
  }
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = (props) => {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = styles(theme);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // when dashboard loads run this function
  useEffect(() => {
    getForms().then(({ data }) => {
      // forms = data
      setForms(data.reverse());
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <main>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info">
              Your share link has been copied!
            </Alert>
          </Snackbar>
          {/* Hero unit */}
          <View className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                gutterBottom
              >
                Welcome to the Dashboard!
              </Typography>
              <View className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      component={Link}
                      to={"/forms/new"}
                      variant="contained"
                    >
                      Create New Form
                    </Button>
                  </Grid>
                </Grid>
              </View>
            </Container>
          </View>
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
                        <Button
                          size="small"
                          color="primary"
                          component={Link}
                          to={`/forms/view/${card._id}`}
                        >
                          View
                        </Button>
                        <CopyToClipboard
                          text={`${window.location.origin}/forms/view/${card._id}`}
                        >
                          <Button
                            size="small"
                            color="primary"
                            onClick={handleClick}
                          >
                            Share
                          </Button>
                        </CopyToClipboard>
                        <Button
                          size="small"
                          color="primary"
                          component={Link}
                          to={`/forms/edit/${card._id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            console.log(card);
                            deleteForm(card._id).then((res) => {
                              getForms().then(({ data }) => {
                                setForms(data.reverse());
                              });
                            });
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            makePrivate(card._id, { private: !card.private });
                            getForms().then(({ data }) => {
                              setForms(data.reverse());
                            });
                          }}
                        >
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
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Dashboard;
