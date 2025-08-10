/////// ///// ////
///// ///// //// //// /// /// // // // // // // // // // Code dédié à la modale // // // // // // // // // // /// /// //// //// ///// /////
/// ///// ////

import { createFigure, createModalFigure } from "./galleries.js";

let currentModal = null;
///// ///// //// //// /// /// // // // // // // liste des constantes consacrées aux modales // // // // // // /// /// //// //// ///// /////
const modify = document.querySelector(".modify");                                             /// /// identifie le lien modifier du portfolio
const modalGal = document.getElementById("modalGallery");                                               /// /// identifie la modale (galerie)
const modalAdd = document.getElementById("modalAdd");                                                     /// /// identifie la modale (ajout)
const addWork =  document.querySelector(".addBtn");                                         /// /// identifie le bouton Ajout photo (galerie)
const back = document.querySelector(".back");                                                     /// /// identifie la flèche arrière (ajout)
const closeGal = document.querySelector(".closeGal");                                                    /// /// identifie la croix (galerie)
const closeAdd = document.querySelector(".closeAdd");                                                      /// /// identifie la croix (ajout)
const addForm = document.getElementById("addForm");                                         /// /// identifie le formulaire d'ajout de projet
const photoPreview = document.getElementById("photoPreview");                                 /// /// identifie l'image pour l'aperçu (ajout)
const submitTitle = document.getElementById("title");                                            /// /// identifie l'input du titre à ajouter
const submitCategory = document.getElementById("category");                                          /// /// identifie la catégory à associer
const submitFile = document.getElementById("file");                                            /// /// identifie l'input du fichier à ajouter
const submitWork = document.querySelector(".submitBtn");                                          /// /// identifie le bouton Valider (ajout)
const loginToken = sessionStorage.getItem("loginToken");                                 /// /// identifie l'utilisateur et ses autorisations

///// ///// //// //// /// /// // // // // // // // Ouverture et fermeture des deux modales // // // // // // // /// /// //// //// ///// /////
function openModal() {
  modify.addEventListener("click", (e) => {
    if (e.target === modify) {
      currentModal = modalGal;
      currentModal.showModal();
      console.log("Modale galerie ouverte !"); // test //
    }
  });
  addWork.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".addBtn")) {
      currentModal.close();
      currentModal = modalAdd;
      currentModal.showModal();
      console.log("Modale d'ajout ouverte !"); // test //
    }
    back.addEventListener("click", backToGallery);
  });
  closeGal.addEventListener("click", closeModal);
  closeAdd.addEventListener("click", closeModal);
  document.addEventListener("click", noCloseInBox);
}
openModal();

function closeModal() {
  resetAddForm();
  currentModal?.close();
}

///// ///// //// //// /// /// // // // Gestion fermeture sur backdrop et retour arrière (ajout) // // // /// /// //// //// ///// /////
function noCloseInBox(e) {
  if(e.target === currentModal) {
    closeModal();
    console.log("Modale fermée !") // test //
  }
}

function backToGallery(e) {
  if (e.target === back) {
    resetAddForm();
    currentModal.close();
    currentModal = modalGal;
    currentModal.showModal();
    console.log("Modale galerie ouverte !"); // test //
  }
}

///// ///// //// //// /// /// // // // Gestion de la suppression de projets dans la modale "Galerie" // // // /// /// //// //// ///// /////
export async function deleteProject(id) {
  try {
    const returnAnswer = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {"Authorization": `Bearer ${loginToken}`}
    });
    console.log("Returned answer :", returnAnswer.status);
    if (!returnAnswer.ok) {
      const txtError = document.createElement("div");
      txtError.innerHTML = "Autorisation refusée.";
      txtError.classList.add("notif");
      document.querySelector(".miniGallery").append(txtError);
    } else {
      const figure = document.querySelector(`figure[data-identifiant="projet-${id}"]`);
      console.log(figure);
      if (figure) {
        figure.remove();
      }
      const modalFigure = document.querySelector(`figure[data-identifiant="miniprojet-${id}"]`);
      console.log(modalFigure);
      if (modalFigure) {
        modalFigure.remove();
      }
    }
  } catch (error) {
    console.error("Erreur de requête :", error);
  }
}

///// ///// //// //// /// /// // // // // Gestion de l'aperçu de l'image dans le formulaire d'ajout // // // /// /// //// //// ///// /////
submitFile.addEventListener("change", () => {
  let file = submitFile.files[0];                                                                                      /// /// fichier fourni
  if (file) {
    const reader = new FileReader();                                                                               /// /// lecteur de fichier
    reader.onload = function (event) {
      photoPreview.classList.remove("hidden");
      photoPreview.src = event.target.result;
      document.querySelector(".photoIcon").classList.add("hidden");
      document.querySelector(".photoLabel").classList.add("hidden");
      document.querySelector(".photoInfo").classList.add("hidden");
    };
    reader.readAsDataURL(file);                                                                           /// /// Convertit le fichier en URL
  }
})

///// ///// //// //// /// /// // // // Gestion de la sélection de catégorie dans le formulaire d'ajout // // // /// /// //// //// ///// /////
async function addCategoriesToSelect() {
  try {
    const returnAnswer = await fetch("http://localhost:5678/api/categories"); 
    const categories = await returnAnswer.json(); 
    submitCategory.innerHTML = ""; 

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;       
      option.textContent = category.name; 
      submitCategory.appendChild(option);   
    });
  } catch (error) {
    console.error("Erreur de catégorie :", error);
  }
}
addCategoriesToSelect();

///// ///// //// //// /// /// // // // // Gestion de l'ajout de projet dans le formulaire d'ajout // // // // /// /// //// //// ///// /////
addForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const imageFile = submitFile.files[0];
  const title = submitTitle.value;
  const categoryId = submitCategory.value;
  if (!title || !categoryId || !imageFile) {
    alert("Veuillez compléter le formulaire.");
    return;
  }
  const newWork = new FormData();
  newWork.append("image", imageFile);
  newWork.append("title", title);
  newWork.append("category", categoryId);
  try {
    const returnAnswer = await fetch("http://localhost:5678/api/works", {
      method: "POST",             
      headers: {Authorization: `Bearer ${loginToken}`},
      body: newWork,             
    });
    if (returnAnswer.ok) { 
      const addedWork = await returnAnswer.json();
      createFigure(addedWork.imageUrl, addedWork.title, addedWork.id);
      createModalFigure(addedWork.imageUrl, addedWork.title, addedWork.id);
      console.log("Nouveau projet ajouté :", addedWork);
    } else {
      alert("Erreur d'envoi : " + returnAnswer.status);
    }
  } catch (error) {
    alert("Erreur réseau : " + error.message)
  }
  resetAddForm();
  closeModal();
})

///// ///// //// //// /// /// // // // // Gestion de la mise à zéro de la modale d'ajout photo // // // /// /// //// //// ///// /////
function resetAddForm() {
  addForm.reset();
  photoPreview.src = "#";
  photoPreview.classList.add("hidden");
  document.querySelector(".photoIcon").classList.remove("hidden");
  document.querySelector(".photoLabel").classList.remove("hidden");
  document.querySelector(".photoInfo").classList.remove("hidden");
  allowFormSubmit();
}

///// ///// //// //// /// /// // // // // Gestion du bouton "Valider" dans le formulaire d'ajout // // // /// /// //// //// ///// /////
function allowFormSubmit() {
  const title = submitTitle.value.trim();
  const category = submitCategory.value;
  const fileSelected = submitFile.files.length > 0;
  if (title && category && fileSelected) {
    submitWork.disabled = false;
    submitWork.classList.remove("grey");
    submitWork.classList.add("green");
    console.log("Bouton du formulaire accessible.") // test //
  } else {
    submitWork.disabled = true;
    submitWork.classList.remove("green");
    submitWork.classList.add("grey");
    console.log("Bouton désactivé : formulaire incomplet."); // test //
  }
}
submitTitle.addEventListener("input", allowFormSubmit);
submitCategory.addEventListener("change", allowFormSubmit);
submitFile.addEventListener("change", allowFormSubmit);