export default class Model {
	constructor() {
		this.tasks = []; // список задач
		this.loadFromLocalStorage();
	}
	/* Методы модели */

	// 1. выгрузка из localStorage
	loadFromLocalStorage() {
		const data = localStorage.getItem("tasks");
		if (data) {
			this.tasks = JSON.parse(data);
		}
	}

	// 2. localStorage сохранение задач
	saveToLocalStorage() {
		localStorage.setItem("task", JSON.stringify(this.tasks));
	}

	// 3. добавление задачи
	addTask(text) {
		// вычисляем id
		let id = 1;
		if (this.tasks.length > 0) {
			id = this.tasks[this.tasks.length - 1]["id"] + 1;
		}

		const newTask = {
			id: id,
			status: "active",
			text: text,
		};
		// добавляем новую задачу в массив задач
		this.tasks.push(newTask);
		this.saveToLocalStorage();

		return newTask;
	}
	// 4. проверка готовности задачи
	changeStatus(task) {
		if (task.status === "active") {
			task.status = "done";
		} else {
			task.status = "active";
		}
		this.saveToLocalStorage();
	}
	// 5. удаление задач
	removeTask(task) {
		const index = this.tasks.indexOf(task);
		this.tasks.splice(index, 1);
		this.saveToLocalStorage();
	}
	// 6. поиск задачи по id
	findTask(id) {
		const task = this.tasks.find(function (task) {
			if (task.id === parseInt(id)) {
				return true;
			}
		});
		return task;
	}
}

// tasks = ['Заверстать стартовый шаблон','Написать скрипт','Записать урок']
// tasks = [{
// 	status: 'done',
// 	text: 'Заверстать стартовый шаблон'
// },{},{}]
