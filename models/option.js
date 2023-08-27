const mongoose = require('mongoose');
const Question = require('./question'); // Import the Question model to establish the relationship

// Define the schema for an option
const optionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true, // This ensures the "option" field is required
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Question // Establish a reference to the 'Question' model, creating a relationship
    },
    vote: {
        type: Number,
        default: 0 // Default value for the vote count
    },
    add_vote: {
        type: String,
    }
});

// Create a model named 'Option' using the optionSchema
const Option = mongoose.model('Option', optionSchema);

// Export the 'Option' model to be used in other parts of the application
module.exports = Option;