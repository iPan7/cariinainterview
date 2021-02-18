// import React, { Component } from 'react';
// import { FormContainer, ToolBox, ContainerComponent, PreviewComponent } from 'zubair-react-form-builder'; 
// import axios from 'axios';

// const myCustoms = [
//     {
//         container : < ContainerComponent/>,
//         preview : < PreviewComponent/>,
//         toolbox : {
//             title : 'Component',
//             icon : 'fa fa-user',
//             name : 'CUSTOM_COM'
//         },
//         states : {
//             toolType: 'CUSTOM_COM',
//             num1 : 1,
//             num2 : 2
//         }
//     }
// ]

// class Test extends Component {
//     render(){



//         return (
//                     <div>                        <FormContainer
//                     updateForm={this.updateForm} 
//                     onSave={this.save} />

//                 < ToolBox/></div>
//         )}
    
//     save(form){
//         // you will receive form
//         console.log(form);
//     }
    
//     updateForm(callback){
//         // fetch form and set it to callback
//         let form = axios
//         callback(form)
//     }
// }

// export default Test;

// import $ from "jquery";
// import jQuery from "jquery";
// import React, { Component, createRef } from "react";
// import ReactDOM from "react-dom";
// import "./styles.css";

// window.jQuery = $;
// window.$ = $;

// require("jquery-ui-sortable");
// require("formBuilder");

// const formData = [
//   {
//     type: "header",
//     subtype: "h1",
//     label: "formBuilder in React"
//   },
//   {
//     type: "paragraph",
//     label: "This is a demonstration of formBuilder running in a React project."
//   }
// ];

// var options = {
//     onSave: function(evt, formData) {
//         toggleEdit();
//         $('.render-wrap').formRender({formData});
//         window.sessionStorage.setItem('formData', JSON.stringify(formData));
//       },
//   };
// $(container).formBuilder(options);

// class Test extends Component {
//   fb = createRef();
//   componentDidMount() {
//     $(this.fb.current).formBuilder({ formData });
//   }

//   render() {

//     return <div id="fb-editor" ref={this.fb} />;
//   }
// }
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from 'prop-types';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

class TestFormMaker extends Component {
    state = {
        name: '',
        data: []
    };

    options = {
        formData: [
            {
                type: 'header',
                subtype: 'h1',
                label: 'Test Form 1'
            }
        ],
        onSave: (event, formData) => {   //Auto binds `this`
        // const newForm = {
        //     name: this.state.name,
        //     form: formData
        // };

        // Add form via addForm action
        // this.props.addForm(newForm);
        console.log(formData);
    }
    };

    fb = createRef();
    componentDidMount() {
        $(this.fb.current).formBuilder(this.options);
    }
    render() {
        return (
                <div id="fb-editor" className="form" ref={this.fb} />
        );
    }
}

export default TestFormMaker;