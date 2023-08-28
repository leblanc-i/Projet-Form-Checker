const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');

// Declaration des fonctions qui controlles chaque input
const pseudoChecker = (value) => {};

const emailChecker = (value) => {};

const passwordChecker = (value) => {};

const confirmChecker = (value) => {};

// Identifier l'input dans laquelle on ce trouve
inputs.forEach(input => {
    input.addEventListener("input", (e) => {
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