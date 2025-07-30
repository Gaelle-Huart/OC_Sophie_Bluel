/////// ///// ////
///// ///// //// //// /// /// // // // // // // Code dédié à la modale // // // // // // /// /// //// //// ///// /////
/// ///// ////

let modal = null;
///// ///// //// //// /// /// // // // liste des constantes consacrées aux modales // // // /// /// //// //// ///// /////
const modify = document.querySelector(".modify");                         /// /// identifie le bouton modifier du portfolio /// ///
const modalGallery = document.getElementById("modalGallery");             /// /// identifie la modale (galerie) /// ///
const closeGallery = document.querySelector(".modalGallery_close");       /// /// identifie la croix (galerie) /// ///
const modalAdd = document.getElementById("modalAdd");                     /// /// identifie la modale (ajout) /// ///
const addWork =  document.querySelector(".addWork_btn");                  /// /// identifie le bouton Ajout photo (galerie) /// ///
const submitWork = document.getElementById("submitWork_btn");             /// /// identifie le bouton Valider (ajout) /// ///
const back = document.querySelector(".topIcons_back");                    /// /// identifie la flèche arrière (ajout) /// ///
const close = document.querySelector(".topIcons_close");                  /// /// identifie la croix (ajout) /// ///
const modalWrap = document.querySelector(".modal_wrapper");               /// /// identifie l'extérieur des modales /// ///
const modalBox = document.querySelector(".modal");                        /// /// identifie la zone de contenu des modales /// ///
const focusTargets = 'button, a, input, textarea, select';                /// /// détermine les éléments cibles du focus /// ///


function openModal() {
  modify.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".modify")) {
      modal = modalGallery;
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
      modal.setAttribute("aria-modal", "true");
      modal.showModal();
    }
    noCloseInBox();
  });
  closeGallery.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal != null) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && modal != null) {                               /// /// si Tab est utilisé et que la modale est ouverte /// ///
      const focusIn = modal.querySelectorAll(focusTargets);               /// /// identifie les cibles du focus /// ///
      const focusArray = Array.from(focusIn);                             /// /// crée un tableau des cibles du focus /// ///
      const focusStart = focusArray[0];                                   /// /// début des éléments prenant le focus /// ///
      const focusEnd = focusArray[focusArray.length - 1];                 /// /// fin des éléments prenant le focus /// ///
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
openModal();

function closeModal() {
  if (!modal) return;
  modal.style.display = "";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.close();
};

function noCloseInBox() {
  if(modal === modalGallery || modal === modalAdd) {
    modal.addEventListener("click", (event) => {
      const rect = modal.getBoundingClientRect();                           /// /// exclu la zone du contenu de la fermeture au clic /// ///
        const isInDialog = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }
};
// ///// ///// //// //// /// /// // // // ouverture et fermeture de la modale "Galerie" // // // /// /// //// //// ///// /////
// modify.addEventListener("click", () => {
//   modalGallery.classList.remove("hidden");
//   modalGallery.setAttribute("aria-hidden", "false");
//   modalGallery.setAttribute("aria-modal", "true");
//   modal = modalGallery ;
// });

// closeGallery.addEventListener("click", () => {
//   modalGallery.classList.add("hidden");
//   modalGallery.setAttribute("aria-hidden", "true");
//   modalGallery.removeAttribute("aria-modal");
//   modal = null ;
// });

// ///// ///// //// //// /// /// // // // fermeture des modales au clic dans l'arrière plan // // // /// /// //// //// ///// /////
// modalGallery.addEventListener("click", (e) => {
//   if(e.target === modalGallery) {
//     modalGallery.classList.add("hidden");
//     modalGallery.setAttribute("aria-hidden", "true");
//     modalGallery.removeAttribute("aria-modal");
//     modal = null ;
//   }
//   if(e.target === modalAdd) {
//     modalAdd.classList.add("hidden");
//     modalAdd.setAttribute("aria-hidden", "true");
//     modalAdd.removeAttribute("aria-modal");
//     modal = null ;
//   }
// });

// ///// ///// //// //// /// /// // // // gestion de la touche "Tab" à l'intérieur des modales // // // /// /// //// //// ///// /////
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Tab" && modal === modalGallery) {                        /// /// si Tab est utilisé et que la modale est ouverte /// ///
//     const focusStart = focusGalArray[0];                                  /// /// début des éléments prenant le focus /// ///
//     const focusEnd = focusGalArray[focusGalArray.length - 1];             /// /// fin des éléments prenant le focus /// ///
//     if (e.shiftKey) { 
//       if (document.activeElement === focusStart) {
//         e.preventDefault();
//         focusEnd.focus();
//       }
//     } else { 
//       if (document.activeElement === focusEnd) {
//         e.preventDefault();
//         focusStart.focus(); 
//       }
//     }
//   }
//   if (e.key === "Tab" && modal === modalAdd) {                            /// /// si Tab est utilisé et que la modale est ouverte /// ///
//     const focusStart = focusAddArray[0];                                  /// /// début des éléments prenant le focus /// ///
//     const focusEnd = focusAddArray[focusAddArray.length - 1];             /// /// fin des éléments prenant le focus /// ///
//     if (e.shiftKey) { 
//       if (document.activeElement === focusStart) {
//         e.preventDefault();
//         focusEnd.focus();
//       }
//     } else { 
//       if (document.activeElement === focusEnd) {
//         e.preventDefault();
//         focusStart.focus(); 
//       }
//     }
//   }
// });

// ///// ///// //// //// /// /// // // // support de la touche "Escape" // // // /// /// //// //// ///// /////
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape" && modal === modalGallery) {
//     modalGallery.classList.add("hidden");
//     modalGallery.setAttribute("aria-hidden", "true");
//     modalGallery.removeAttribute("aria-modal");
//     modal = null ;
//   };
//   if (e.key === "Escape" && modal === modalAdd) {
//     modalAdd.classList.add("hidden");
//     modalAdd.setAttribute("aria-hidden", "true");
//     modalAdd.removeAttribute("aria-modal");
//     modal = null ;
//   };
// });
