const Question = require("../models/question.model.js");

//create and save a new question
exports.create = (req, res) => {
	// Validate request
	if(!req.body){
		return res.status(400).send({
			message: "Question content cannot be empty"
		});
	}

	//create Question
	const question = new Question(req.body);

	//save Question in database
	question.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message:err.message || "Error occurred while creating the question."
			});
		});
};

//Retrive and return all Questions from the database
exports.findAll = (req, res) => {
	Question.find()
		.then(questions => {
			res.send(questions);
		}).catch(err => {
			res.status(500).send({
				message: "Error occurred when fetching all questions"
			});
		});
};

//Find a single Question with Question ID
exports.findOne = (req, res) => {
	Question.findById(req.params.questionId)
		.then(question => {
			if(!question){
				return res.status(400).send({
					message: "Question not found with id " + req.params.questionId
				});
			}
			res.send(question);
		}).catch(err => {
			if(err.kind === "ObjectId"){
				res.status(404).send({
					message: "Question not found with id " + req.params.questionId
				});
			}
			res.status(500).send({
				message: "Error retrieving question with id " + req.params.questionId
			});
		});
};

exports.findOneUnanswered = (req, res) => {
	// Validate request
	if(!req.body){
		return res.status(400).send({
			message: "Question request must pass a judge id"
		});
	}

	console.log(req.body.judgeId)
//	Question.find({'judgments.judge': {"$ne" : req.body.judgeId}})
	Question.findOne({'judgments.judge':{$ne: 'req.body.judgeId'}} )
		.then(question => {
			if(!question){
				return res.status(400).send({
					message: "Question not found with judge id " + req.body.judgeId
				});
			}
			res.send(question);
		}).catch(err => {
			if(err.kind === "ObjectId"){
				res.status(404).send({
					message: "Question not found with judge id " + req.body.judgeId
				});
			}
			res.status(500).send({
				message: "Error retrieving question with judge id " + req.body.judgeId
			});
		});
};


//update a Question by Question Id
exports.update = (req, res) => {
	//validate request
	if(!req.body){
		return res.status(400).send({
			message: "question information to be updated is missing."
		});
	}

	//find question and update it by ID
	Question.findByIdAndUpdate(req.params.questionId,
		{ $push: { judgments: req.body }}, {new: true})
		.then(question => {
			if(!question){
				return res.status(400).send({
					message: "question not found with id " + req.params.questionId
				});
			}
			res.send(question);
		}).catch(err => {
			if (err.kind === 'ObjectId'){
				return res.status(404).send({
					message: "Question not found with Id " + req.params.questionId
				});
			}

			res.status(500).send({
				message: "Error updating question with id " + res.params.questionId
			});
		});
}

//delete a Question by Question Id
exports.delete = (req, res) => {
	Question.findByIdAndRemove(req.params.questionId)
		.then(question => {
			if(!question){
				return res.status(404).send({
					message: "Question not found with id " + req.params.questionId
				});
			}
			res.send({message: "Question deleted successfully"})
		}).catch(err =>{
			if(err.kind === 'ObjectId'){
				res.status(404).send({
					message: "Question not found with id " + req.params.questionId
				});

				return res.status(500).send({
					message: "Could not delete Question with id " + req.params.questionId
				});
			}	
		});

}
