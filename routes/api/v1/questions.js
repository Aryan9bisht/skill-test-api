const express = require('express');
const router = express.Router();
const questionController = require('../../../controller/question-controller'); // Import the question-controller

// Route to create a new question
router.post('/create', questionController.create);

// Route to retrieve details of a specific question
router.get('/details/:id', questionController.details);

// Route to delete a specific question
router.delete('/delete/:id', questionController.delete);

// Mount the sub-router for handling options related to a question
router.use('/options', require('./option'));

module.exports = router;