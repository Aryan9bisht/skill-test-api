const Option = require('../models/option'); // Import the Option model
const Question = require('../models/question'); // Import the Question model

// Controller function to create a new option for a question
module.exports.create = async function(req, res) {
    try {
        console.log(req.body.content, req.params.id);

        // Create a new option and associate it with the given question ID
        const opt = await Option.create({
            option: req.body.content,
            question: req.params.id,
        });

        // Update the created option with a vote endpoint
        const updateOpt = await Option.findByIdAndUpdate(opt._id, { "add_vote": `http://localhost:8000/api/v1/options/${opt._id}/vote` });
        updateOpt.save();

        // Find the associated question by its ID and add the new option to its options array
        const ques = await Question.findById(req.params.id);
        if (ques) {
            ques.options.push(updateOpt);
            await ques.save();
            console.log(ques);
            res.send(ques);
        } else {
            res.status(404).send('Question not found');
        }
    } catch (err) {
        console.error("Error creating option:", err);
        res.status(500).send("Error creating option");
    }
};

// Controller function to handle voting for an option
module.exports.vote = async function(req, res) {
    try {
        console.log(req.params.id);

        // Find the option by ID and increment its vote count
        const opt = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } });
        if (opt) {
            await opt.save();
            console.log(opt);
            res.send(opt);
        } else {
            res.status(404).send('Option not found');
        }
    } catch (err) {
        console.error("Error voting for option:", err);
        res.status(500).send("Error voting for option");
    }
};

// Controller function to delete an option
module.exports.delete = async function(req, res) {
    try {
        console.log('id', req.params.id);

        // Find the option by ID
        const opt = await Option.findById(req.params.id);
        if (opt) {
            const quesId = opt.question;

            // Find the associated question and remove the option's ID from its options array
            const ques = await Question.findByIdAndUpdate(quesId, { $pull: { options: req.params.id } });

            // Delete the option
            await Option.findByIdAndDelete(req.params.id);

            console.log(ques);
            res.send('Option deleted');
        } else {
            res.status(404).send('Option not found');
        }
    } catch (err) {
        console.error("Error deleting option:", err);
        res.status(500).send("Error deleting option");
    }
};