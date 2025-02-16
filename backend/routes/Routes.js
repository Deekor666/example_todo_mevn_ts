const express = require('express');

const app = express.Router();
const repository = require('../repositories/TodoRepository');

app.get('/', (req, res) => {
	repository.findAll().then((todos) => {
		res.set('Access-Control-Allow-Origin', '*');
		res.json(todos);
	}).catch((error) => console.log(error));
});

app.post('/', (req, res) => {
    const { name } = req.body;
	repository.create(name).then((todo) => {
		res.set('Access-Control-Allow-Origin', '*');
    	res.json(todo);
    }).catch((error) => console.log(error));
});

app.put('/:id', (req, res) => {
	const { id } = req.params;
	const todo = { name: req.body.name, done: req.body.done };
        repository.updateById(id, todo)
	.then(res.status(200).json([]))
	.catch((error) => console.log(error));
});

app.delete('/:id', (req, res) => {
	const { id } = req.params;
	repository.deleteById(id)
	.then((ok) => {
		console.log(ok);
		console.log(`Deleted record with id: ${id}`);
	})
	.catch((error) => console.log(error));
});

module.exports = app;
