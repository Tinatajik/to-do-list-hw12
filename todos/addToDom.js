import { API_URL, productsTable, DEFAULT_PAGE_SIZE } from "./variables.js";
import { createPagination } from "./pagination.js";
import { removeProduct } from "./remove.js";
// Read
async function readProducts() {
  const getRes = await fetch(`${API_URL}`);
  const response = await getRes.json();
  console.log(response);
  productsTable.innerHTML = "";
  const parsedUrl = new URL(window.location.href);
  const page = parsedUrl.searchParams.get("page");
  if (!page) {
    location.assign(`http://127.0.0.1:5501/todos/todos.html?page=1`);
  }
  try {
    const res = await fetch(
      `${API_URL}?page=${page}&limit=${DEFAULT_PAGE_SIZE}`
    );
    const data = await res.json();
    data.forEach(addToDOM);
    createPagination(response.length, page);
  } catch (e) {
    console.log(e);
  }
}
function addToDOM(product) {
  const productRow = document.createElement("tr");
  productRow.dataset.id = product.id;
  productRow.style.lineHeight = "40px";
  const { titleCell, descriptionCell, dueDateCell, actionCell } =
    generateTableCells(product);

  productRow.appendChild(titleCell);
  productRow.appendChild(descriptionCell);
  productRow.appendChild(dueDateCell);
  productRow.appendChild(actionCell);

  productsTable.appendChild(productRow);
}
function generateTableCells(product) {
  const titleCell = document.createElement("td");
  titleCell.innerHTML = product.title;
  titleCell.title = product.title;

  const descriptionCell = document.createElement("td");
  descriptionCell.innerHTML = product.description;
  descriptionCell.title = product.description;

  const dueDateCell = document.createElement("td");
  const date = new Date(product.dueDate).toDateString();
  dueDateCell.innerHTML = date;
  dueDateCell.title = date;

  const viewButton = document.createElement("button");
  viewButton.dataset.id = product.id;
  // viewButton.innerHTML = '<i class="bi bi-eye"></i> ';
  viewButton.innerHTML = `  <label class="check__container">
    <input id=${product.id} class="checkbox_input" type="checkbox">
    <span class="checkmark"></span>
  </label>`;
  viewButton.title = "VIEW";
  viewButton.className = "btn btn-warning btn-sm m-1 text-white";
  // viewButton.dataset.bsToggle = "modal";
  viewButton.dataset.bsTarget = "#viewModal";
  viewButton.addEventListener("click", () => viewProduct(product));

  const editButton = document.createElement("button");
  editButton.dataset.id = product.id;
  // editButton.innerHTML = '<i class="bi bi-pen"></i>';
  editButton.innerHTML = `  <a
    href="../home/index.html?taskId=${product.id}"
    id="${product.id}"
    class="btn-edit"
  >
  <i class="bi bi-pen"></i></a>`;
  editButton.title = "EDIT";
  editButton.className = "btn btn-primary btn-sm";
  // editButton.dataset.bsToggle = "modal";
  editButton.dataset.bsTarget = "#editModal";
  // editButton.addEventListener("click", () => editProduct(product));

  const deleteButton = document.createElement("button");
  deleteButton.dataset.id = product.id;
  deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
  deleteButton.title = "DELETE";
  deleteButton.className = "btn btn-danger btn-sm m-1";
  deleteButton.dataset.bsToggle = "modal";
  deleteButton.dataset.bsTarget = "#deleteModal";
  deleteButton.addEventListener("click", () => removeProduct(product.id));

  const actionCell = document.createElement("td");
  actionCell.appendChild(viewButton);
  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);
  return { titleCell, descriptionCell, dueDateCell, actionCell };
}

readProducts();
export { addToDOM, generateTableCells, readProducts };
