const Question = require('../models/question'); // Import the Question model
const Option = require('../models/option'); // Import the Option model

// Controller function to create a new question
module.exports.create = async function(req, res) {
    console.log(req.url);
    console.log(req.body);

    try {
        // Create a new question using the request body
        const newQuestion = await Question.create(req.body);
        console.log(newQuestion);
        res.send(newQuestion);
    } catch (err) {
        console.log("Error in creating the question schema:", err);
        res.status(500).send("Error creating question");
    }
};

// Controller function to delete a question and its associated options
module.exports.delete = async function(req, res) {
    try {
        // Find the question by ID
        const questionToDelete = await Question.findById(req.params.id);
        if (!questionToDelete) {
            return res.status(404).send('Question not found');
        }

        // Delete the question
        await questionToDelete.deleteOne();

        // Delete all options associated with the question
        await Option.deleteMany({ question: req.params.id });

        res.send("Question and associated options deleted");
    } catch (err) {
        console.log("Error in deleting question:", err);
        res.status(500).send("Error deleting question");
    }
};

// Controller function to retrieve details of a question along with its options
module.exports.details = async function(req, res) {
    console.log(req.params.id);

    try {
        // Find the question by ID and populate its 'options' field with option documents
        const ques = await Question.findById(req.params.id).populate('options');

        if (ques) {
            res.send(ques);
        } else {
            res.status(404).send("Question not found");
        }
    } catch (err) {
        console.log("Error retrieving question details:", err);
        res.status(500).send("Error retrieving question details");
    }
};