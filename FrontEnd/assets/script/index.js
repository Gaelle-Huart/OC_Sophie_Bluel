/////// ///// ////
///// ///// //// //// /// /// // // // Code dédié à la page d'accueil // // // /// /// //// //// ///// /////
/// ///// ////

///// ///// //// //// /// /// // // // Récupération des projets // // // /// /// //// //// //// ///// /////
async function fetchWorks(filter = null) {
  document.querySelector(".gallery").innerHTML = "";
  try {   
    const response = await fetch("http://localhost:5678/api/works");
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const works = await response.json();
    const filtering = filter ? works.filter((data) => data.categoryId === filter) : works; // (=>) = fonction anonyme
    filtering.forEach(sujet => {
      addWork(sujet.imageUrl, sujet.title);
    });
    
  } catch (erreur) {
    console.log("Erreur :", erreur);
  }
}
await fetchWorks(null); // appel de fonction asynchrone

function addWork(imageUrl, title) {
  const project = document.createElement("figure");
  project.innerHTML = `<img src="${imageUrl}" alt="${title}">
  <figcaption>${title}</figcaption>`;
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
  bouton.classList.add('filter_btn');
  bouton.addEventListener("click", () => fetchWorks(id)); // et pas categoryId ! envoie à fetchWorks
  bouton.addEventListener("click", (event) => switchFilter(event));
  document.querySelector(".all").addEventListener("click", (event) => switchFilter(event)); // fait en sorte que "tous" switch
  document.querySelector(".filter").append(bouton);
}

function switchFilter(event) {
  const filtre = document.querySelector(".filter");
  Array.from(filtre.children).forEach((filter_btn) =>
    filter_btn.classList.remove("selected")
  );
  event.target.classList.add("selected");
}

///// ///// //// //// /// /// // // // Gestion "login" et "logout" // // // /// /// //// //// //// //// ///// /////
if(sessionStorage.loginToken) {
  document.querySelector(".navig-in").innerText = "logout";
}

document.querySelector(".navig-in").addEventListener("click", function () {
  if (sessionStorage.getItem("loginToken")) {
    sessionStorage.removeItem("loginToken");
    window.location.reload();
  }
});

///// ///// //// //// /// /// // // // Gestion du bouton "tous" // // // /// /// //// //// //// //// ///// /////
document.querySelector(".all").addEventListener("click", () => fetchWorks());
