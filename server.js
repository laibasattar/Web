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

server.get("/products", (req, res) => {
  res.render("products", { currentPage: 'product' });
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

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
  material: String,
});

server.get('/products', (req, res) => {
  Product.find({})
    .then(products => {
      res.render('index', { products });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

server.get('/products/add', (req, res) => {
  res.render('add');
});

server.post('/products/add', async (req, res) => {
  const { name, price, material } = req.body;
  const newProduct = new Product({
    name,
    price,
    material,
  });
  
  try {
    await newProduct.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

server.get('/products/edit/:id', (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then(product => {
      res.render('edit', { product });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

server.post('/products/edit/:id', (req, res) => {
  const id = req.params.id;
  const { name, price, material } = req.body;
  Product.findByIdAndUpdate(id, { name, price, material })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

server.post('/products/delete/:id', (req, res) => {
  const id = req.params.id;
  Product.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

server.listen(4000);