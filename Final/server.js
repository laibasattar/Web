const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const drinksRouter = require('./routes/drinks');
const path = require('path');

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

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/drinks', drinksRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
