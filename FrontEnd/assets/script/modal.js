/////// ///// ////
///// ///// //// //// /// /// // // // Code dédié à la modale // // // /// /// //// //// ///// /////
/// ///// ////

let modal = null;

///// ///// //// //// /// /// // // // ouverture de la modale // // // /// /// //// //// ///// /////
const modifyGallery = document.querySelector(".modify");
const modalGallery = document.getElementById("modalGallery");
const modalAdd = document.getElementById("modalAdd");

const openModal = function (e) {
  e.preventDefault();
  const modif = document.querySelector(e.target.getAttribute('href'))
  modif.removeAttribute("aria-hidden");
}