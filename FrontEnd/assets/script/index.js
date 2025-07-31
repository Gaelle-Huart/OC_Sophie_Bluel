/////// ///// ////
///// ///// //// //// /// /// // // // // // // Code dédié à la page d'accueil // // // // // // /// /// //// //// ///// /////
/// ///// ////

///// ///// //// //// /// /// // // // // // // // Récupération des projets // // // // // /// /// //// //// //// ///// /////
async function fetchWorks(filter = null) {
  document.querySelector(".gallery").innerHTML = "";                                                           /// /// refresh de la galerie
  document.querySelector(".miniGallery").innerHTML = "";
  try {   
    const response = await fetch("http://localhost:5678/api/works");                                 /// /// appel à l'API pour récupération
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const works = await response.json();                                                                     /// /// retour converti en JSON
    const filtering = filter ? works.filter((data) => data.categoryId === filter) : works;                   /// /// (=>) = fonction anonyme
    filtering.forEach(the => {
      createFigure(the.imageUrl, the.title);
      createModalFigure(the.imageUrl);
    });
    
  } catch (erreur) {
    console.log("Erreur :", erreur);
  }
}
await fetchWorks(null);                                                                                 /// /// appel de fonction asynchrone

function createFigure(imageUrl, title) {
  const project = document.createElement("figure");
  project.innerHTML = `<img src="${imageUrl}" alt="${title}">
    <figcaption>${title}</figcaption>`;
  document.querySelector(".gallery").appendChild(project);
}
function createModalFigure(imageUrl, title, id) {
  const project = document.createElement("figure");
  project.innerHTML = `<img src="${imageUrl}" alt="${title}">
    <button class="trashCan_btn">
      <i id="${id}" class="fa-solid fa-trash-can"></i>
    </button>`;
  document.querySelector(".miniGallery").appendChild(project);
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
      createFilterButton(categories[i], categories[i]);
    }
  } catch (erreur){
    console.log("Erreur :", erreur);
  }
}
await fetchCategories();


///// ///// //// //// /// /// // // // Gestion des boutons filtre // // // // /// /// //// //// ///// /////
function createFilterButton({name, id}) {
  const bouton = document.createElement("button");
  bouton.innerHTML = `${name}`;
  bouton.classList.add("filter_btn");
  bouton.addEventListener("click", () => fetchWorks(id));                                    /// /// et pas categoryId ! envoie à fetchWorks
  bouton.addEventListener("click", (event) => switchFilter(event));
  document.querySelector(".all").addEventListener("click", (event) => switchFilter(event));        /// /// fait en sorte que "tous" switch
  document.querySelector(".filter").append(bouton);
}

function switchFilter(event) {
  const filter = document.querySelector(".filter");
  Array.from(filter.children).forEach((filter_btn) =>
    filter_btn.classList.remove("selected")
  );
  event.target.classList.add("selected");
}

///// ///// //// //// /// /// // // // Gestion "login" et "logout" // // // /// /// //// //// //// //// ///// /////
function loggedIn() {
  if(sessionStorage.loginToken) {
    const topband = document.querySelector(".edit_topband");
    topband.classList.remove("hidden");
    document.querySelector("body").style.marginTop = '59px';
    document.querySelector(".navig-in").innerText = "logout";
    const modify = document.querySelector(".modify");
    modify.classList.remove("hidden");
    const filter = document.querySelector(".filter");
    filter.classList.add("hidden");
  }
}
loggedIn();

document.querySelector(".navig-in").addEventListener("click", function logout () {
  if (sessionStorage.loginToken) {
    sessionStorage.removeItem("loginToken");
    window.location.reload();
  }
});

///// ///// //// //// /// /// // // // Gestion du bouton "tous" // // // /// /// //// //// //// //// ///// /////
document.querySelector(".all").addEventListener("click", () => fetchWorks());
