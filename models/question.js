const mongoose = require('mongoose');

// Define the schema for a question
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option' // Reference to the 'Option' model, creating a relationship
    }]
});

// Create a model named 'Question' using the questionSchema
const Question = mongoose.model('Question', questionSchema);

// Export the 'Question' model to be used in other parts of the application
module.exports = Question;