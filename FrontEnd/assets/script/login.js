/////// ///// ////
///// ///// //// //// /// /// // // // // // // // Code dédié à la page login // // // /// /// /// //// //// //// ///// /////
/// ///// ////

async function sendLoginRequest() {
  const loginForm = document.querySelector(".login_form");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // pas de rechargement
    
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
      txtError.innerHTML = "Email ou mot de passe incorrect.";
      txtError.classList.add("error");
      document.querySelector(".login_form").prepend(txtError);
    } else {
      let result = await returnAnswer.json();

      const token = result.token;
      sessionStorage.setItem("loginToken", token);

      window.location.href = "index.html";
    }
  });
}

sendLoginRequest();