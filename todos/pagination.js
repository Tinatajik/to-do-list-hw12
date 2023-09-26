import { DEFAULT_PAGE_SIZE } from "./variables.js";
import { readProducts } from "./addToDom.js";
function createPagination(productCount, currentPage) {
  const pageCount = Math.ceil(productCount / DEFAULT_PAGE_SIZE);
  if (currentPage > pageCount) {
    window.location.href = "/notFoundpage/404.html";
  }
  let lis = "";
  for (let i = 1; i <= pageCount; i++) {
    lis += `<li class="page-item ${
      i === currentPage ? "active" : ""
    }"><a href="http://127.0.0.1:5501/todos/todos.html?page=${i}" class="page-link">${i}</a></li>`;
  }
  document.querySelector("ul.pagination").innerHTML = lis;
}

document.querySelector("ul.pagination").addEventListener("click", (e) => {
  const lis = document.querySelectorAll(".page-item");
  lis.forEach((li) => li.classList.remove("active"));
  e.target.parentElement.classList.add("active");
  const currentPage = Number(e.target.innerText);
  readProducts(currentPage);
});
window.addEventListener("load", () => {});
export { createPagination };
