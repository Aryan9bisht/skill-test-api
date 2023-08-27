const express = require('express');
const router = express.Router();
const optionsController = require('../../../controller/options-controller'); // Import the options-controller

// Route to create a new option for a specific question
router.post('/:id/create', optionsController.create);

// Route to handle voting for a specific option
router.get('/:id/vote', optionsController.vote);

// Route to delete a specific option
router.delete('/delete/:id', optionsController.delete);

module.exports = router;