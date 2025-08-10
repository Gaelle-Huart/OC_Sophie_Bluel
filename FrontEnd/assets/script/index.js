/////// ///// ////
///// ///// //// //// /// /// // // // // // // // // Code dédié à la page d'accueil // // // // // // // // /// /// //// //// ///// /////
/// ///// ////

///// ///// //// //// /// /// // // // // // // // // // // // // Imports // // // // // // // // // /// /// //// //// //// //// ///// /////
import { fetchWorks, fetchCategories, gallery, miniGallery } from "./galleries.js";
import { loggedIn } from "./login.js";

///// ///// //// //// /// /// // // // // // // // // Appels des fonctions exportées // // // // // /// /// //// //// //// //// ///// /////
await fetchWorks();
await fetchCategories();
loggedIn();

///// ///// //// //// /// /// // // // // // // // Gestion de la déconnexion du site // // // // // /// /// //// //// //// //// ///// /////
document.querySelector(".navig-in").addEventListener("click", function logout() {
  if (sessionStorage.loginToken) {
    sessionStorage.removeItem("loginToken");
    window.location.reload();
  }
});

///// ///// //// //// /// /// // // // // // // // Gestion du bouton "tous" du filtre // // // // // /// /// //// //// //// //// ///// /////
document.querySelector(".all").addEventListener("click", () => fetchWorks());

///// ///// //// //// /// /// // // // // // Gestion de l'affichage des nouveaux travaux // // // // /// /// //// //// //// //// ///// /////
gallery.addEventListener("change", fetchWorks);
miniGallery.addEventListener("change", fetchWorks);