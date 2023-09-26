import { API_URL } from "./variables.js";
import { readProducts } from "./addToDom.js";
function removeProduct(id) {
  document.querySelector("#confirm-delete-btn").dataset.id = id;
}

document.querySelector("#confirm-delete-btn").addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  deleteProduct(id);
});

async function deleteProduct(productId) {
  try {
    await fetch(`${API_URL}/${productId}`, { method: "DELETE" });
    readProducts();
  } catch (e) {
    console.log(e.message);
  }
}
export { removeProduct, deleteProduct };
