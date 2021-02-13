const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passportt-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);



// app.get('/', (req,res) => {
//     res.send({hi: 'there'});
// });
// // get info

// app.post('/', function (req, res) {
//     res.send('POST request to the homepage');
//   });
// // send info

// app.put('/', function (req, res) {
//     res.send('PUT request to the homepage');
//   });
// // update all the properties of something

// app.delete('/', function (req, res) {
//     res.send('DELETE request to the homepage');
//   });
// // delete something

// app.patch('/', function (req, res) {
//     res.send('PATCH request to the homepage');
//   });
// // update one or two properties of something

// //req - object representing the incoming request
// // res - object representing the outgoing response
// // res.send - immediately send some JSON back to whoever made this request