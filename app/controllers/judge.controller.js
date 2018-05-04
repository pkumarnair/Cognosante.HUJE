const Judge = require("../models/Judge.model.js");

//create and save a new judge
exports.create = (req, res) => {
	// Validate request
	if(!req.body){
		return res.status(400).send({
			message: "Judge content cannot be empty"
		});
	}

	//create Judge
	const judge = new Judge(req.body);

	//save Judge in database
	judge.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message:err.message || "Error occurred while creating the judge."
			});
		});
};

//Retrive and return all Judges from the database
exports.findAll = (req, res) => {
	Judge.find()
		.then(judges => {
			res.send(judges);
		}).catch(err => {
			res.status(500).send({
				message: "Error occurred when fetching all judges"
			});
		});
};

//Find a single Judge with Judge ID
exports.findOne = (req, res) => {
	Judge.findById(req.params.judgeId)
		.then(judge => {
			if(!judge){
				return res.status(400).send({
					message: "Judge not found with id " + req.params.judgeId
				});
			}
			res.send(judge);
		}).catch(err => {
			if(err.kind === "ObjectId"){
				res.status(404).send({
					message: "Judge not found with id " + req.params.judgeId
				});
			}
			res.status(500).send({
				message: "Error retrieving judge with id " + req.params.judgeId
			});
		});
};

//update a Judge by Judge Id
exports.update = (req, res) => {
	//validate request
	if(!req.body){
		return res.status(400).send({
			message: "judge information to be updated is missing."
		});
	}

	//find judge and update it by ID
	Judge.findByIdAndUpdate(req.params.judgeId, req.body, {new: true})
		.then(judge => {
			if(!judge){
				return res.status(400).send({
					message: "judge not found with id " + req.params.judgeId
				});
			}
			res.send(judge);
		}).catch(err => {
			if (err.kind === 'ObjectId'){
				return res.status(404).send({
					message: "Judge not found with Id " + req.params.judgeId
				});
			}

			res.status(500).send({
				message: "Error updating judge with id " + res.params.judgeId
			});
		});
}

//delete a Judge by Judge Id
exports.delete = (req, res) => {
	Judge.findByIdAndRemove(req.params.judgeId)
		.then(judge => {
			if(!judge){
				return res.status(404).send({
					message: "Judge not found with id " + req.params.judgeId
				});
			}
			res.send({message: "Judge deleted successfully"})
		}).catch(err =>{
			if(err.kind === 'ObjectId'){
				res.status(404).send({
					message: "Judge not found with id " + req.params.judgeId
				});

				return res.status(500).send({
					message: "Could not delete Judge with id " + req.params.judgeId
				});
			}	
		});

}
