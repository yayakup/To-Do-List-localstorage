
const input = document.querySelector(".input-list");
const list = document.querySelector(".list");


let items = JSON.parse(localStorage.getItem("items")) || [];


items.forEach((itemText) => {
  addItem(itemText);
});

input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    if (this.value.trim() === "") {
      alert("Lütfen bir madde girin!");
    } else {
      addItemAndSave(this.value);
      this.value = ""; 
    }
  }
});

function addItemAndSave(inputText) {
  addItem(inputText); 

  
  items.push(inputText);
  localStorage.setItem("items", JSON.stringify(items));
}

function addItem(inputText) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `${inputText} <span></span>`;

  listItem.addEventListener("click", function () {
    this.classList.toggle("checked");
  });
  listItem.querySelector("span").addEventListener("click", function (e) {
    e.stopPropagation(); 
    if (confirm("Are you sure you want to delete this item?")) {
      
      const itemIndex = items.indexOf(inputText);
      if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        localStorage.setItem("items", JSON.stringify(items));
      }
      listItem.remove();
    }
  });

  list.appendChild(listItem);
}