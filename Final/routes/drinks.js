const express = require('express');
const router = express.Router();
const Drink = require('../models/drink');


router.get('/', async (req, res) => {
    try {
      const drinks = await Drink.find();
      res.json(drinks);
    } catch (err) {
      console.error('Failed to fetch drinks:', err);
      res.status(500).json({ error: 'Failed to fetch drinks' });
    }
  });

  router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const drinks = await Drink.findById(id);
    if (!drinks) {
      return res.status(404).json({ error: 'Drink not found' });
    }
    res.json(drink);
  } catch (err) {
    console.error('Failed to fetch drink:', err);
    res.status(500).json({ error: 'Failed to fetch drink' });
  }
});

router.post('/', async (req, res) => {
    const { name, sugarQuantity, carbonated } = req.body;
    const newDrink = new Drink({ name, sugarQuantity, carbonated });
    try {
      const drink = await newDrink.save();
      res.status(201).json(drink);
    } catch (err) {
      console.error('Failed to create drink:', err);
      res.status(500).json({ error: 'Failed to create drink' });
    }
  });

module.exports = router;
