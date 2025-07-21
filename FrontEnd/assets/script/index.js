/////// ///// ////
///// ///// //// //// /// /// // // // Code dédié à la page d'accueil // // // /// /// //// //// ///// /////
/// ///// ////

///// ///// //// //// /// /// // // // Récupération des projets // // // /// /// //// //// //// ///// /////
async function fetchWorks(filter) {
  document.querySelector(".gallery").innerHTML = "";
  try {   
    const response = await fetch("http://localhost:5678/api/works");
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const works = await response.json();
    const filtering = filter ? works.filter((data) => data.categoryId === filter) : works; // (=>) = fonction anonyme
    filtering.forEach(sujet => {
      setWorks(sujet);
    });
    
  } catch (erreur) {
    console.log("Erreur :", erreur);
  }
}
fetchWorks(); // appel de fonction

function setWorks(data) { 
  const project = document.createElement("figure");
  project.innerHTML = `<img src=${data.imageUrl} alt=${data.title}>
  <figcaption>${data.title}</figcaption>`;
  document.querySelector(".gallery").appendChild(project);
}

///// ///// //// //// /// /// // // // Récupération des catégories // // // // /// /// //// //// ///// /////
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const categories = await response.json();
    for (let i = 0 ; i < categories.length ; i++) {
      setFilter(categories[i]);
    }
  } catch (erreur){
    console.log("Erreur :", erreur);
  }
}
fetchCategories();


///// ///// //// //// /// /// // // // Gestion des boutons filtre // // // // /// /// //// //// ///// /////
function setFilter(data) {
  const bouton = document.createElement("button");
  bouton.innerHTML = `${data.name}`;
  bouton.classList.add('filter_btn');
  bouton.addEventListener("click", () => fetchWorks(data.id)); // et pas categoryId ! envoie à fetchWorks
  bouton.addEventListener("click", (event) => switchFilter(event));
  document.querySelector(".all").addEventListener("click", (event) => switchFilter(event)); // fait en sorte que "tous" switch
  document.querySelector(".filter").append(bouton);
}

function switchFilter(event) {
  const filtre = document.querySelector(".filter");
  Array.from(filtre.children).forEach((btn) =>
    btn.classList.remove("selected")
  );
  event.target.classList.add("selected");
}

///// ///// //// //// /// /// // // // Gestion de la modale // // // /// /// //// //// //// //// ///// /////


///// ///// //// //// /// /// // // // Gestion du bouton "tous" // // // /// /// //// //// //// //// ///// /////
document.querySelector(".all").addEventListener("click", () => fetchWorks());