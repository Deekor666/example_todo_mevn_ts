const Todo = require('../models/Todo');

class TodoRepository {

	constructor(model) {
		this.model = model;
	}

	create(name) {
		const newTodo = { name, done: false};
		const todo = new this.model(newTodo);

		return todo.save();
	}

	findAll() {
		return this.model.find();
	}

	findById(id) {
		return this.model.findById(id);
	}

	deleteById(id) {
		return this.model.findAndModify(id);
	}

	updateById(id, object) {
		const query = { _id: id };
		return this.model.findAndModify(query, { $set: { name: object.name, done: object.done } });
	}
};

module.exports = new TodoRepository(Todo);
