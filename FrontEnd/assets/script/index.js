/////// ///// ////
///// ///// //// //// /// /// // // // // // // // Code dédié à la page d'accueil // // // // // // // /// /// //// //// ///// /////
/// ///// ////

const gallery = document.querySelector(".gallery");
const miniGallery = document.querySelector(".miniGallery");
///// ///// //// //// /// /// // // // // // // // // Récupération des projets // // // // // // /// /// //// //// //// ///// /////
async function fetchWorks(filter = null) {
  gallery.innerHTML = "";                                                                                       /// /// refresh de la galerie
  miniGallery.innerHTML = "";
  try {   
    const returnAnswer = await fetch("http://localhost:5678/api/works");                              /// /// appel à l'API pour récupération
    if(!returnAnswer.ok) {
      throw new Error(`Returned answer status: ${returnAnswer.status}`);
    }
    const works = await returnAnswer.json();                                                                  /// /// retour converti en JSON
    const filtering = filter ? works.filter((e) => e.categoryId === filter) : works;                     /// /// ( () => ) = fonction anonyme
    filtering.forEach(the => {
      createFigure(the.imageUrl, the.title, the.id);
      createModalFigure(the.imageUrl, the.title, the.id);
    });
  } catch (error) {
    console.log("FetchWorks error :", error);
  }
}
await fetchWorks();                                                                           /// /// await pour appel de fonction asynchrone

///// ///// //// //// /// /// // // // // // // // // Création de figures pour galeries // // // // // // /// /// //// //// //// ///// /////
function createFigure(imageUrl, title, id) {
  const project = document.createElement("figure");
  project.innerHTML = `<img src="${imageUrl}" alt="${title}">
    <figcaption">${title}</figcaption>`;
  project.dataset.id = `${id}`;
  project.dataset.identifiant = `projet-${id}`;
  gallery.appendChild(project);
};
function createModalFigure(imageUrl, title, id) {
  if(sessionStorage.loginToken) {
    const project = document.createElement("figure");
    project.innerHTML = `<img src="${imageUrl}" alt="${title}">
      <button data-id="${id}" class="trashCan_btn">
        <i class="fa-solid fa-trash-can"></i>
      </button>`;
    project.dataset.identifiant = `miniprojet-${id}`;
    miniGallery.appendChild(project);
    const deleteBtn = document.querySelectorAll(".trashCan_btn");                       /// /// récupère les boutons de suppression (trash)
    deleteBtn.forEach((button) => {
      button.getAttribute("data-id");                                                        /// /// identifie l'id de chaque bouton/projet
      button.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        if (id) {
          deleteProject(id);
        } else {
          console.error("Aucune ID trouvée.");
        }
      });
    });
  }
};

///// ///// //// //// /// /// // // // Récupération des catégories // // // // /// /// //// //// ///// /////
async function fetchCategories() {
  try {
    const returnAnswer = await fetch("http://localhost:5678/api/categories");
    if(!returnAnswer.ok) {
      throw new Error(`Returned answer status: ${returnAnswer.status}`)
    }
    const categories = await returnAnswer.json();
    for (let i = 0 ; i < categories.length ; i++) {
      createFilterButton(categories[i]);
    }
  } catch (error){
    console.log("FetchCategories error :", error);
  }
}
await fetchCategories();


///// ///// //// //// /// /// // // // Gestion des boutons filtre // // // // /// /// //// //// ///// /////
function createFilterButton({name, id}) {
  const bouton = document.createElement("button");
  bouton.innerHTML = `${name}`;
  bouton.classList.add("filter_btn");
  bouton.addEventListener("click", () => fetchWorks(id));
  bouton.addEventListener("click", (event) => switchFilter(event));
  document.querySelector(".all").addEventListener("click", (event) => switchFilter(event));
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
    document.querySelector("body").classList.add("down");
    document.querySelector(".navig-in").innerText = "logout";
    const modify = document.querySelector(".modify");
    modify.classList.remove("hidden");
    const filter = document.querySelector(".filter");
    filter.classList.add("hidden");
  }
}
loggedIn();

document.querySelector(".navig-in").addEventListener("click", function logout() {
  if (sessionStorage.loginToken) {
    sessionStorage.removeItem("loginToken");
    window.location.reload();
  }
});

///// ///// //// //// /// /// // // // // // Gestion du bouton "tous" du filtre // // // // // /// /// //// //// //// //// ///// /////
document.querySelector(".all").addEventListener("click", () => fetchWorks());

///// ///// //// //// /// /// // // // // // Gestion de l'affichage des nouveaux travaux // // // // /// /// //// //// //// //// ///// /////
gallery.addEventListener("change", fetchWorks);
miniGallery.addEventListener("change", fetchWorks);