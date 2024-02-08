export default class View {
	constructor(tasks) {
		// при первом запуске запускает все задачи в localstorage
		tasks.forEach((task) => {
			this.renderTask(task);
		});
	}
	elements = {
		input: document.getElementById("newTask"),
		form: document.getElementById("form"),
		tasksList: document.getElementById("tasksList"),
	};
	// 1. отображение задач на странице
	renderTask(taskObject) {
		// получение данных о задаче
		const completeClass = taskObject.status === "done" ? "completed" : "";
		const checked = taskObject.status === "done" ? "checked" : "";

		if (taskObject.status === "done") {
			checked = "checked";
		}
		const taskHtml = `
			<li class="todo-item" data-id="${taskObject.id}">
				<label class="todo-item-label">
					<input class="checkbox" type="checkbox"  ${checked}/>
					<span class='${completeClass}'>${taskObject.text}</span>
					<button class="btn btn-secondary btn-sm" data-delete>Удалить</button>
				</label>
			</li>
	`;
		this.elements.tasksList.insertAdjacentHTML("beforeend", taskHtml);
	}
	// 2. очищение input
	clearInput() {
		this.elements.input.value = "";
	}
	// 3. статус задачи
	changeStatus(taskObject) {
		const taskElement = this.elements.tasksList.querySelector(
			`[data-id="${taskObject.id}"]`
		);

		const taskTextEl = taskElement.querySelector("span");
		// добавляем или убираем class completed
		if (taskObject.status === "done") {
			taskTextEl.classList.add("completed");
		} else {
			taskTextEl.classList.remove("completed");
		}
	}

	// 4. удалить задачу
	removeTask() {
		const taskElement = this.elements.tasksList.querySelector(
			`[data-id="${taskObject.id}"]`
		);
		taskElement.remove();
	}
}
