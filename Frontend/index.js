const expenseForm = document.getElementById("expense-form");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const button = document.getElementById("submit-btn");

let expense = [];
let editId = null;

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const amountValue = Number(amount.value);
  const descriptionValue = description.value.trim();
  const categoryValue = category.value;

  if (amountValue <= 0 || descriptionValue === "" || categoryValue === "") {
    alert("Please enter valid expense details");
    return;
  }

  if (editId !== null) {
    const exp = expense.find(function (item) {
      return item.id === editId;
    });

    if (exp) {
      exp.amount = amountValue;
      exp.description = descriptionValue;
      exp.category = categoryValue;
    }

    editId = null;
    button.textContent = "Add Expense";
  } else {
    const newExpense = {
      id: Date.now(),
      amount: amountValue,
      description: descriptionValue,
      category: categoryValue,
    };

    expense.push(newExpense);
  }

  displayExpense();
  // expenseForm.reset();
});

function displayExpense() {
  expenseList.innerHTML = "";

  expense.forEach(function (item) {
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2";

    const details = document.createElement("div");
    const title = document.createElement("h5");
    title.textContent = item.description;
    const categoryText = document.createElement("p");
    categoryText.className = "mb-1 text-muted";
    categoryText.textContent = item.category;
    const amountText = document.createElement("strong");
    amountText.textContent = "₹" + item.amount.toFixed(2);
    details.appendChild(title);
    details.appendChild(categoryText);
    details.appendChild(amountText);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn btn-warning btn-sm me-2";
    editButton.addEventListener("click", function () {
      editExpense(item.id);
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.addEventListener("click", function () {
      deleteExpense(item.id);
    });
    details.appendChild(editButton);
    details.appendChild(deleteButton);
    li.appendChild(details);
     expenseList.appendChild(li);
  });
}

function editExpense(id) {
  const exp = expense.find(function (item) {
    return item.id === id;
  });

  if (!exp) {
    return;
  }

  amount.value = exp.amount;
  description.value = exp.description;
  category.value = exp.category;

  editId = id;
  button.textContent = "Update Expense";

  expenseForm.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function deleteExpense(id) {
  expense = expense.filter(function (item) {
    return item.id !== id;
  });

  if (editId === id) {
    editId = null;
    expenseForm.reset();
    button.textContent = "Add Expense";
  }
  displayExpense();
}
