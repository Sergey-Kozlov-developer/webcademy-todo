import Model from "./model.js";
import View from "./view.js";

const model = new Model();
const view = new View(model.tasks);

// находим форму на странице и отслеживаем событие submit
//1. добавление задачи
view.elements.form.addEventListener("submit", function (event) {
	event.preventDefault();

	const newTask = model.addTask(view.elements.input.value);
	view.renderTask(newTask);
	view.clearInput();
});

// отслеживаем checkbox и удалить задачу.
view.elements.tasksList.addEventListener("click", function (event) {
	// проверяем клик по checkbox и получаем id
	if (event.target.getAttribute("type") === "checkbox") {
		const id = event.target.closest(".todo-item").dataset.id; // родитель тега li
		const task = model.findTask(id);
		model.changeStatus(task);

		// отметить задачу как сделанную
		view.changeStatus(task);
	}
	// delete
	if (event.target.hasAttribute("data-delete")) {
		const id = event.target.closest(".todo-item").dataset.id;
		const task = model.findTask(id);
		model.removeTask(task);
		view.removeTask(task);
	}
});
