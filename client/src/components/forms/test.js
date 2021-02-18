import React, { Component } from 'react';
import { FormContainer, ToolBox, ContainerComponent, PreviewComponent } from 'zubair-react-form-builder'; 
import axios from 'axios';


const myCustoms = [
    {
        container : < ContainerComponent/>,
        preview : < PreviewComponent/>,
        toolbox : {
            title : 'Component',
            icon : 'fa fa-user',
            name : 'CUSTOM_COM'
        },
        states : {
            toolType: 'CUSTOM_COM',
            num1 : 1,
            num2 : 2
        }
    }
]

class Test extends Component {
    render(){

        return (
                    <div>                        <FormContainer
                    updateForm={this.updateForm} 
                    onSave={this.save} />

                < ToolBox/></div>
        )}
    
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

export default Test;