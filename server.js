const express = require("express");
const mongoose = require('mongoose');

let server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("home", { currentPage: 'home' });
});

server.get("/contact", (req, res) => {
  res.render("contact", { currentPage: 'contact' });
});

server.get("/home", (req, res) => {
  res.render("home", { currentPage: 'home' });
});


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const apiRouter = require('./routes/api');
server.use('/api', apiRouter);

server.listen(4000);