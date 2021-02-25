import React, { Component, createRef, useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

require("jquery-ui-sortable");
require("formBuilder/dist/form-render.min.js");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const getFormById = async (id) => {
  try {
    const form = await axios.get(`/api/forms/${id}`);
    return form;
  } catch (err) {
    console.log(err);
  }
};

const RenderedForm = (props) => {
  // const history = useHistory();
  const formId = props.match.params[0];
  const url = window.location.href;

  useEffect(() => {
    getFormById(formId).then(({ data }) => {
      const container = document.getElementById("fb-rendered-form");
      const formData = data.questions;
      const formRenderOpts = {
        container,
        formData,
        dataType: "json",
      };
      $(container).formRender(formRenderOpts);
    });
  }, []);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  return (
    <div>
      <div id="fb-rendered-form" className="form" />

      <CopyToClipboard text={url}>
        <Button variant="outlined" onClick={handleClick} color="primary">
          Copy Form Link
        </Button>
      </CopyToClipboard>
      <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Your link has been copied!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RenderedForm;
