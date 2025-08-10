/////// ///// ////
///// ///// //// //// /// /// // // // // // // // Code dédié à la page login // // // // // // /// /// /// //// //// //// ///// /////
/// ///// ////

async function sendLoginRequest() {
  if(sessionStorage.loginToken) return;
  const loginForm = document.querySelector(".login_form");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();                                                                                       /// /// pas de rechargement
    
    const user = {
      email : document.getElementById("email").value,
      password : document.getElementById("password").value
    }
 
    const returnAnswer = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {"Content-Type":"application/json;charset=utf-8"},
      body: JSON.stringify(user)
    });
    
    if(!returnAnswer.ok) {
      let txtError = document.querySelector(".login_form .error");
      txtError = document.createElement("div");
      txtError.innerHTML = "Erreur dans l’identifiant ou le mot de passe.";
      txtError.classList.add("notif");
      document.querySelector(".login_form").prepend(txtError);
    } else {
      let result = await returnAnswer.json();

      const token = result.token;
      sessionStorage.setItem("loginToken", token);                               /// /// stockage temporaire du token dans la session windows

      window.location.href = "index.html";
    }
  });
}
sendLoginRequest();

///// ///// //// //// /// /// // // // // // // // Gestion "login" et "logout" // // // // // // /// /// //// //// //// //// ///// /////
export function loggedIn() {
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