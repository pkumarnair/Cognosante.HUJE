module.exports = (app) => {
	const judges = require('../controllers/judge.controller.js');

	//Create a new judge
	app.post('/judges', judges.create);

	//retrieve all judges
	app.get('/judges', judges.findAll);

	//retrive a single judge with judge id
	app.get('/judges/:judgeId', judges.findOne);

	//update a judge wit judge id
	app.put('/judges/:judgeId', judges.update);

	//Delete a judge with judge id
	app.delete('/judges/:judgeId', judges.delete);
}
