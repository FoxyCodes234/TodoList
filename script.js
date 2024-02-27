const textBox = document.getElementById("myInp");
    const div = document.getElementById("pContainer");

    // Load todos from local storage on page load
    window.onload = function() {
      loadTodos();
    };

    function addTodo() {
      const newTodoContainer = document.createElement("div");
      const newPara = document.createElement("p");
      const newXBtn = document.createElement("button");
      const newVBtn = document.createElement("button");
      const newHr = document.createElement("hr");

      if (textBox.value !== "") {
        newPara.textContent = textBox.value;
        newPara.style.marginRight = "10px";
        newTodoContainer.appendChild(newPara);

        newVBtn.textContent = "✅";
        newVBtn.style.height = "20px";
        newVBtn.style.position = "relative";
        newVBtn.style.top = "7px";
        newVBtn.addEventListener("click", () => actionButton(newVBtn, '✅'));
        newTodoContainer.appendChild(newVBtn);

        newXBtn.textContent = "❌";
        newXBtn.style.height = "20px";
        newXBtn.style.position = "relative";
        newXBtn.style.top = "7px";
        newXBtn.addEventListener("click", () => actionButton(newXBtn, '❌'));
        newTodoContainer.appendChild(newXBtn);

        newTodoContainer.style.display = "flex";
        newTodoContainer.style.flexDirection = "row";
        newTodoContainer.setAttribute("class", "containers");
        newHr.style.width = "100%";
        newHr.style.backgroundColor = "black";
        newHr.style.height = "1.5px";
        newHr.style.border = "none";

        div.appendChild(newTodoContainer);
        div.appendChild(newHr);

        // Save todos to local storage
        saveTodos();
      }

      textBox.value = "";
    }

    function actionButton(button, action) {
      const todoContainer = button.parentNode;
      const paragraph = todoContainer.querySelector("p");

      if (paragraph) {
        paragraph.style.color = "white";

        if (action === "✅") {
          paragraph.setAttribute("class", "checked");
        } else if (action === "❌") {
          todoContainer.nextElementSibling.remove();
          todoContainer.remove();
          // Save todos to local storage after removal
          saveTodos();
        }
      }
    }

    function resetTodos() {
      div.innerHTML = null;
      textBox.value = "";
      // Reset todos in local storage
      localStorage.removeItem("todos");
    }

    function saveTodos() {
      const containers = document.getElementsByClassName("containers");
      const todos = [];

      for (const container of containers) {
        const paragraph = container.querySelector("p");
        if (paragraph) {
          const todoText = paragraph.textContent;
          const isChecked = paragraph.classList.contains("checked");
          todos.push({ text: todoText, checked: isChecked });
        }
      }

      localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        const todos = JSON.parse(savedTodos);

        for (const todo of todos) {
          const newTodoContainer = document.createElement("div");
          const newPara = document.createElement("p");
          const newXBtn = document.createElement("button");
          const newVBtn = document.createElement("button");
          const newHr = document.createElement("hr");

          newPara.textContent = todo.text;
          newPara.style.marginRight = "10px";
          newTodoContainer.appendChild(newPara);

          newVBtn.textContent = "✅";
          newVBtn.style.height = "20px";
          newVBtn.style.position = "relative";
          newVBtn.style.top = "7px";
          newVBtn.addEventListener("click", () => actionButton(newVBtn, '✅'));
          newTodoContainer.appendChild(newVBtn);

          newXBtn.textContent = "❌";
          newXBtn.style.height = "20px";
          newXBtn.style.position = "relative";
          newXBtn.style.top = "7px";
          newXBtn.addEventListener("click", () => actionButton(newXBtn, '❌'));
          newTodoContainer.appendChild(newXBtn);

          newTodoContainer.style.display = "flex";
          newTodoContainer.style.flexDirection = "row";
          newTodoContainer.setAttribute("class", "containers");
          newHr.style.width = "100%";
          newHr.style.backgroundColor = "black";
          newHr.style.height = "1.5px";
          newHr.style.border = "none";

          div.appendChild(newTodoContainer);
          div.appendChild(newHr);

          if (todo.checked) {
            newPara.setAttribute("class", "checked");
          }
        }
      }
    }

    document.getElementById("myInp").addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addTodo();
      }
    });
