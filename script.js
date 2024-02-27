let textBox = document.getElementById("myInp");
function addTodo() {
  const newTodoContainer = document.createElement("div");
  const newPara = document.createElement("p");
  const div = document.getElementById("pContainer");
  const newXBtn = document.createElement("button");
  const newVBtn = document.createElement("button");
  const newHr = document.createElement("hr");
  const newBr = document.createElement("br");

  if (textBox.value != "") {
    newPara.textContent = textBox.value;
    newPara.style.marginRight = "10px";
    newTodoContainer.appendChild(newPara);

    newVBtn.textContent = "✅";
    newVBtn.style.height = "20px";
    newVBtn.style.position = "relative";
    newVBtn.style.top = "7px";
    newVBtn.setAttribute("onclick", "actionButton(this, '✅')");
    newTodoContainer.appendChild(newVBtn);

    newXBtn.textContent = "❌";
    newXBtn.style.height = "20px";
    newXBtn.style.position = "relative";
    newXBtn.style.top = "7px";
    newXBtn.setAttribute("onclick", "actionButton(this, '❌')");
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
  }

  textBox.value = "";
}

function actionButton(button, action) {
  var todoContainer = button.parentNode;

  var paragraph = todoContainer.querySelector("p");

  if (paragraph) {
    paragraph.style.color = "white";

    if (action == "✅") {
      paragraph.setAttribute("class", "checked");
    } else if (action == "❌") {
      todoContainer.nextElementSibling.remove();
      todoContainer.remove();
    }
  }
}

function resetTodos() {
  const containers = document.getElementById("pContainer");
  containers.innerHTML = null;
  textBox.value = "";
}

document.getElementById("myInp").addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    addTodo();
  }
});
