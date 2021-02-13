const express = require("express");
const mongoose = require("mongoose");
require('./services/passport');

const app = express();

(require('./routes/authRoutes')(app));

// PORT dynamically chosen between Heroku's assignment and the local machine port.

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://username:<password>@cariinainterview.nzoke.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

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

// nodemon allows for the server to auto-restart after any saved changes to see edits in real time, saving time for developers