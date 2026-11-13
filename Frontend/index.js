const expenseForm = document.getElementById("expense-form");
const amount = document.getElementById("amount");
const description = document.getElementById("description");
const category = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const button = expenseForm.querySelector('button[type="submit"]');

const API_URL = "/expenses";

let editId = null;

async function getExpenses() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Unable to fetch expenses");
    }

    const expenses = await response.json();

    displayExpense(expenses);
  } catch (error) {
    console.error(error);
    alert("Unable to load expenses");
  }
}

expenseForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const expenseData = {
    amount: Number(amount.value),
    description: description.value.trim(),
    category: category.value,
  };

  if (
    expenseData.amount <= 0 ||
    expenseData.description === "" ||
    expenseData.category === ""
  ) {
    alert("Please enter valid expense details");
    return;
  }

  try {
    let response;

    if (editId !== null) {
      response = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });
    } else {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Operation failed");
    }

    expenseForm.reset();
    editId = null;
    button.textContent = "Add Expense";

    await getExpenses();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
function displayExpense(expenses) {
  expenseList.innerHTML = "";
  expenses.forEach(function (item) {
    const li = document.createElement("li");
    li.className ="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2";
    const details = document.createElement("div");
    const title = document.createElement("h5");
    title.textContent = item.description;
    const categoryText = document.createElement("p");
    categoryText.className = "mb-1 text-muted";
    categoryText.textContent = item.category;
    const amountText = document.createElement("strong");
    amountText.textContent = "₹" + Number(item.amount).toFixed(2);
    details.appendChild(title);
    details.appendChild(categoryText);
    details.appendChild(amountText);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn btn-warning btn-sm me-2";
    editButton.addEventListener("click", function () {
      editExpense(item);
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
function editExpense(item) {
  amount.value = item.amount;
  description.value = item.description;
  category.value = item.category;
  editId = item.id;
  button.textContent = "Update Expense";
  expenseForm.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
async function deleteExpense(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unable to delete expense");
    }
    if (String(editId) === String(id)) {
      editId = null;
      expenseForm.reset();
      button.textContent = "Add Expense";
    }
    await getExpenses();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
getExpenses();
