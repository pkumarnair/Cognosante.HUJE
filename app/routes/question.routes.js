module.exports = (app) => {
	const questions = require('../controllers/question.controller.js');

	//Create a new question
	app.post('/questions', questions.create);

	//retrieve all questions
	app.get('/questions', questions.findAll);

	//retrive a single question with question id
	app.post('/question', questions.findOneUnanswered);

	//update a question wit question id
	app.put('/questions/:questionId', questions.update, questions.findOneUnanswered);

	//Delete a question with question id
	app.delete('/questions/:questionId', questions.delete);
}
