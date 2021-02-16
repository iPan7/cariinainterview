//FormField contains logic to render a single label and text input

import React from 'react';

export default ({ input, label, meta: { error, touched} }) => {
    return (
        <div>
            <label>{label}</label>
            <br></br>
            <input {...input} style={{ marginBottom: '5px'}}/>
            <div style={{ color: 'red', marginBottom: '20px'}}>
            {touched && error}
            </div>
        </div>
    );
};