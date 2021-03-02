import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";


require("jquery-ui-sortable");
require("formBuilder/dist/form-render.min.js");

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
  const [privateForm, setPrivateForm] = useState(false)

  useEffect(() => {
    getFormById(formId).then(({ data }) => {
      if (data.private) {
        setPrivateForm(true);
        return;
      }
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

    return privateForm ? "This form is private" : (
    <div>
      <div id="fb-rendered-form" className="form" />
    </div>
  );
};

export default RenderedForm;
