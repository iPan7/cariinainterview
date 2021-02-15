//FormField contains logic to render a single label and text input

import React, { Component } from 'react';

export default ({ input }) => {
    return (
        <div>
            <input {...input}/>
        </div>
    );
};