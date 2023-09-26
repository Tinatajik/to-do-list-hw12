import { API_URL } from "./variables.js";
async function readProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
}

async function viewProduct(product) {
  const productWithDetails = await readProduct(product.id);
  const viewModal = document.querySelector("#viewModal .modal-body");
  // viewModal.querySelector("#createdAt").innerHTML =
  //   productWithDetails.createdAt;
  // viewModal.querySelector("#updatedAt").innerHTML =
  //   productWithDetails.updatedAt;
  viewModal.querySelector("#checked").innerHTML = productWithDetails.checked;
}
// document.querySelectorAll(".checkbox_input").forEach((checkbox) => {
//   console.log("hello");
//   checkbox.addEventListener("click", () => {
//     const isDone = checkbox.checked;
//     console.log(isDone);
//     const id = checkbox.id;
//     toggleDone(productId, isDone);
//   });
// });
// const toggleDone = async function (productId, isDone) {
//   try {
//     await fetch(`${API_URL}/${productId}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         isDone: isDone,
//         updatedAt: new Date(),
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch {}
// };
export { viewProduct };
