const categoryItems = document.querySelectorAll(".dropdown-item");
const categoryInput = document.querySelector("#categoryInput");
const categoryBtn = document.querySelector("#categoryBtn");

categoryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const selectedCategory = e.target.getAttribute("data-value");
    categoryBtn.textContent = e.target.textContent;
    categoryInput.value = selectedCategory;
  });
});

let table = document.getElementById("tbodyId");

async function getAllExpenses() {
  // e.preventDefault();
  try {
    const res = await axios.get("http://localhost:3000/get/getAllExpenses");

    res.data.forEach((expenses) => {
      const categoryValue = expenses.category;
      const descriptionValue = expenses.description;
      const amountValue = expenses.amount;
      const orderId = expenses.id;

      let tr = document.createElement("tr");
      tr.className = "align-middle trStyle";

      table.appendChild(tr);

      let th = document.createElement("th");
      th.setAttribute("scope", "row");

      tr.appendChild(th);
      th.appendChild(document.createTextNode(orderId));

      let td1 = document.createElement("td");
      td1.appendChild(document.createTextNode(categoryValue));

      let td2 = document.createElement("td");
      td2.appendChild(document.createTextNode(descriptionValue));

      let td3 = document.createElement("td");
      td3.appendChild(document.createTextNode(amountValue));

      let td4 = document.createElement("td");

      let deleteBtn = document.createElement("button");
      deleteBtn.className = "editDelete btn btn-danger delete";
      deleteBtn.appendChild(document.createTextNode("Delete"));

      let editBtn = document.createElement("button");
      editBtn.className = "editDelete btn btn-success edit";
      editBtn.appendChild(document.createTextNode("Edit"));

      td4.appendChild(deleteBtn);
      td4.appendChild(editBtn);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
    });
  } catch {
    (err) => console.log(err);
  }
}

async function deleteExpense(e) {
  try {
    if (e.target.classList.contains("delete")) {
      let tr = e.target.parentElement.parentElement;
      let id = tr.children[0].textContent;
      const res = await axios.get(
        `http://localhost:3000/get/deleteExpense/${id}`
      );
      window.location.reload();
    }
  } catch {
    (err) => console.log(err);
  }
}

async function editExpense(e) {
  try {
    const categoryValue = document.getElementById("categoryBtn");
    const descriptionValue = document.getElementById("descriptionValue");
    const amountValue = document.getElementById("amountValue");
    const submitBtn = document.getElementById("submitBtn");
    console.log(categoryValue, descriptionValue, amountValue);
    if (e.target.classList.contains("edit")) {
      let tr = e.target.parentElement.parentElement;
      let id = tr.children[0].textContent;
      console.log(id);
      //Fill the input values with the existing values
      const res = await axios.get("http://localhost:3000/get/getAllExpenses");
      res.data.forEach((expense) => {
        console.log("searching for id");
        if (expense.id == id) {
          console.log("Yeh id aayi hai res main: " + expense.id);
          categoryValue.textContent = expense.category;
          descriptionValue.value = expense.description;
          amountValue.value = expense.amount;
          submitBtn.textContent = "Update";

          // const form = document.getElementById("form1");

          submitBtn.addEventListener("click", async function update(e) {
            e.preventDefault();
            console.log("request to backend for edit");
            const res = await axios.post(
              `http://localhost:3000/post/editExpense/${id}`,
              {
                category: categoryValue.textContent.trimStart().trimEnd(),
                description: descriptionValue.value,
                amount: amountValue.value,
              }
            );

            submitBtn.removeEventListener("click", update);
            submitBtn.textContent = "Submit";
            window.location.reload();
          });
        }
      });
    }
  } catch {
    (err) => console.log(err);
  }
}

document.addEventListener("DOMContentLoaded", getAllExpenses);

table.addEventListener("click", (e) => {
  deleteExpense(e);
});

table.addEventListener("click", (e) => {
  console.log("calling Edit");
  editExpense(e);
  console.log("Finish Edit");
});
