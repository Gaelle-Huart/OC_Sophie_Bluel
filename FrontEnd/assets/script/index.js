/////// ///// ////
///// ///// //// //// /// /// // // // Code dédié à la page d'accueil // // // /// /// //// //// ///// /////
/// ///// ////

///// ///// //// //// /// /// // // // Récupération des projets // // // /// /// //// //// //// ///// /////

async function fetchProjets(filtre) {
  const URL = "http://localhost:5678/api/works";
  try {   
    const response = await fetch(URL);
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const projets = await response.json();                                                      
    const projetsFilter = filtre ? projets.filter((info) => info.categoryId === filtre) : projets;

    projetsFilter.forEach(projets => {
      getWorks(projets);
    });
  } catch (erreur) {
    console.log("Erreur :", erreur);
  }
}
fetchProjets();                                                                                              // appel de la fonction

// // erreur dans la console (problème d'id) ==> trouver d'où elle vient ; la fonction marche quand même // //
function getWorks(works) {                                                                                  // récupération des infos
  const projet = document.createElement("figure");                                                        // ajout figure + description
  projet.dataset.identifiant = `projet-${works.id}`;
  projet.innerHTML = `
    <img src=${works.imageUrl} alt=${works.title}>
    <figcaption>${works.title}</figcaption>
  `;
  document.querySelector(".gallery").appendChild(projet);                                               // ajoute figure en fin de gallery
}
getWorks();                                                                                                // affichage des projets (f5)

///// ///// //// //// /// /// // // // Récupération des catégories // // // // /// /// //// //// ///// /////



///// ///// //// //// /// /// // // // Affichage des boutons filtre // // // // /// /// //// //// ///// /////



///// ///// //// //// /// /// // // // Gestion de la modale // // // /// /// //// //// //// //// ///// /////


