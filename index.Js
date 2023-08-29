const form = document.querySelector("form");
const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
const progressBar = document.getElementById("progress-bar");

// Creation des variables pour pouvoir stocker ce qui est taper dans l'input
let pseudo, email, password, confirmPass;

// On cree une fonction qui va gerer l'affichage des erreurs
// Et elle prend trois parametre
const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag +"-container");
    const span = document.querySelector("." + tag +"-container > span");

    // On verifie si c'est une fonction d'erreur ou non
    if (!valid) {
        // Si c'est ne pas valid
        container.classList.add("error");
        span.textContent = message;
    } else {
        // Si c'est valid
        container.classList.remove("error");
        span.textContent = message;
    }
}
// Declaration des fonctions qui controles chaque input
const pseudoChecker = (value) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
        errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
        pseudo = null // pour vider le pseudo à fin d'eviter la validation
    // Si on tape des caractères speciaux et qu'on devrait pas
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
        errorDisplay("pseudo", "Le pseudo ne doit pas contenir de caractères speciaux");
        pseudo = null;
    } else {
        errorDisplay("pseudo", "", true);
        // Lorsque y'a plus d'erreur donc on veut que notre variable pseudo s'incremente de l'information du pseudo
        pseudo = value;
    }
};

const emailChecker = (value) => {;
    // Si ça ne marche pas
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,3}$/i)) {
        errorDisplay("email", "Le mail n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", "", true);
        email = value;
    }
};
const passwordChecker = (value) => {
    progressBar.classList = ""; // Evite que les progressBar soit enlever au fuir et a mesure qu'on suprime le mot de passe
    // Si ça ne correspond pas
    if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        errorDisplay("password", "Minimum de 8 caractères, une majuscule, un chiffre et un caractère special");
        progressBar.classList.add("progressRed");
    } else if (value.length < 12) {
        progressBar.classList.add("progressBlue");
        errorDisplay("password", "", true);
        password = value;
    } else {
        progressBar.classList.add("progressGreen");
        errorDisplay("password", "", true);
        password = value;
    }
    if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (value) => {
    // Si les deux passes ne correspond pas
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPass = false;
    } else {
        errorDisplay("confirm", "", true);
        confirmPass = true;
    }
};

// Identifier l'input dans laquelle on ce trouve
inputs.forEach(input => {
    input.addEventListener("input", (e) => {
        // On utilise un switch pour jouer respectivement chaque fonction
        switch(e.target.id) {
            case "pseudo" :
                pseudoChecker(e.target.value);
                break;
            case "email" :
                emailChecker(e.target.value);
                break;
            case "password" :
                passwordChecker(e.target.value);
                break;
            case "confirm" :
                confirmChecker(e.target.value);
                break;
            default : null;  
        }
    });
});
// Pour soumettre le formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Si toutes ces conditions sont verifiées on envoi les données sous forme d'objet
    if (pseudo && email && password && confirmPass) {
        const data = {
            pseudo,
            email,
            password,
        };
        console.log(data);

        // Pour vider les champs après l'envoi du form
        inputs.forEach(input => input.value = "");
        // Et enlève la progressBar
        progressBar.classList = "";
        // Et là c'est pour eviter une seconde envoi du form
        pseudo = null;
        email = null;
        password = null;
        confirmPass = null;
        alert("Inscription validée");
    } else {
        alert ("Veuillez d'abord remplir correctement les champs");
    }
})