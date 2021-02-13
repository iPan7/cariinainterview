const express = require('express');
const app = express();

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public","index.html"));
  });

app.get("/newform", function(req, res) {
    res.sendFile(path.join(__dirname, "public","newform.html"));
  });

app.listen(5000);




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