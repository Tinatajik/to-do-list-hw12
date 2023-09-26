import {
  API_URL,
  productForm,
  add_btn,
  titleInput,
  description,
  dueDateInput,
} from "./variables.js";
async function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1500);
  });
}
// Create
async function createNewProduct(e) {
  const newProduct = gatherFormData(e);
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    Toastify({
      text: "Task added sucessful",
      duration: 3000,
      // destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    resetForm();
  } catch (e) {
    console.log(e);
  }
}
function gatherFormData(e) {
  const { title, description, dueDate } = e.target;
  return {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
  };
}
// productForm.addEventListener("submit", createNewProduct);
// console.log({ productForm });

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(productForm).entries());
  if (taskId) {
    editData(taskId, formData);
  } else {
    await createNewProduct(e);
  }
});

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("taskId");
console.log(taskId);
document.addEventListener("DOMContentLoaded", () => {
  if (taskId) {
    add_btn.textContent = "Save";
    const data = fetch(`${API_URL}/${taskId}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.id) {
          titleInput.value = data.title;
          description.value = data.description;
          dueDateInput.valueAsDate = new Date(data.dueDate);
        } else {
          window.location.href = "/home/index.html";
        }
      });
  }
});

const editData = async function (taskId, data) {
  Toastify({
    text: "Task edited sucessful",
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  resetForm();
  await delay(1);
  console.log(data);
  const information = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      updatedAt: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const url = new URL(window.location.href);
  // // const params = new URLSearchParams(url.search);
  // url.search = "";
  // console.log(url.search);
  // // params.delete("taskId");
  // history.pushState({}, "", url);
  if (information.ok) {
    window.location.href = "/home/index.html";
  }
};

function resetForm() {
  productForm.reset();
}
function inputDateValidation() {
  const date = new Date().toISOString().split("T")[0];
  dueDateInput.setAttribute("min", date);
}
inputDateValidation();
