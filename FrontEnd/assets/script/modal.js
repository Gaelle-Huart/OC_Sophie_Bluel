/////// ///// ////
///// ///// //// //// /// /// // // // // // // Code dédié à la modale // // // // // // /// /// //// //// ///// /////
/// ///// ////

let currentModal = null;
///// ///// //// //// /// /// // // // liste des constantes consacrées aux modales // // // /// /// //// //// ///// /////
const modify = document.querySelector(".modify");                                 /// /// identifie le bouton modifier du portfolio /// ///
const modalGallery = document.getElementById("modalGallery");                                 /// /// identifie la modale (galerie) /// ///
const modalAdd = document.getElementById("modalAdd");                                           /// /// identifie la modale (ajout) /// ///
const addWork =  document.querySelector(".addBtn");                               /// /// identifie le bouton Ajout photo (galerie) /// ///
const submitWork = document.getElementById("submitBtn");                                /// /// identifie le bouton Valider (ajout) /// ///
const back = document.querySelector(".back");                                           /// /// identifie la flèche arrière (ajout) /// ///
const closeGal = document.querySelector(".closeGal");                                          /// /// identifie la croix (galerie) /// ///
const closeAdd = document.querySelector(".closeAdd");                                            /// /// identifie la croix (ajout) /// ///
const focusTargets = 'button, a, input, textarea, select';                           /// /// détermine les éléments cibles du focus /// ///

///// ///// //// //// /// /// // // // Ouverture et fermeture des deux modales // // // /// /// //// //// ///// /////
function openModal() {
  modify.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".modify")) {
      currentModal = modalGallery;
      currentModal.showModal();
    }
  });
  addWork.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".addBtn")) {
      currentModal.close();
      currentModal = modalAdd;
      currentModal.showModal();
    }
    back.addEventListener("click", backToGallery);
  });
  closeGal.addEventListener("click", closeModal);
  closeAdd.addEventListener("click", closeModal);
  document.addEventListener("click", noCloseInBox);
  closeOnEscape();
  trapFocusInModal();
};
openModal();

function closeModal() {
  currentModal?.close();
};

///// ///// //// //// /// /// // // // Gestion des fermetures et du focus des modales // // // /// /// //// //// ///// /////
function closeOnEscape() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentModal != null) {
      closeModal();
    } 
  });
};

function noCloseInBox(e) {
  if(e.target === currentModal) {
    closeModal();
  }
};

function trapFocusInModal() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && currentModal != null) {                                  /// /// si Tab est utilisé et la modale ouverte /// ///
      const focusIn = currentModal.querySelectorAll(focusTargets);                            /// /// identifie les cibles du focus /// ///
      const focusArray = Array.from(focusIn);                                           /// /// crée un tableau des cibles du focus /// ///
      const focusStart = focusArray[0];                                                 /// /// début des éléments prenant le focus /// ///
      const focusEnd = focusArray[focusArray.length - 1];                                 /// /// fin des éléments prenant le focus /// ///
      if (e.shiftKey) { 
        if (document.activeElement === focusStart) {
          e.preventDefault();
          focusEnd.focus();
        }
      } else { 
        if (document.activeElement === focusEnd) {
          e.preventDefault();
          focusStart.focus(); 
        }
      }
    }
  });
};

///// ///// //// //// /// /// // // // Gestion des éléments de la deuxième modale // // // /// /// //// //// ///// /////
function backToGallery(e) {
  if (e.target === back && currentModal === modalAdd) {
    currentModal.close();
    currentModal = modalGallery;
    currentModal.showModal();
  }
};
