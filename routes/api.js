const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Message = require('../models/User');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


 //Create a new message
 router.post('/submit', (req, res) => {
    const { name, email, subject, message } = req.body;
    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });
  
    newMessage.save()
      .then(savedMessage => {
        const response = {
          message: 'Message sent successfully',
          message: savedMessage
        };
        const formattedResponse = JSON.stringify(response, null, 2);
        res.setHeader('Content-Type', 'application/json');
        res.send(formattedResponse);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error saving Message' });
      });
  });
  

module.exports = router;