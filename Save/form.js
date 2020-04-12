var submitBtn = document.getElementById("bouton-form-resa");
var nomResa = document.getElementById("nom-resa");
var prenomResa = document.getElementById("prenom-resa");

submitBtn.addEventListener("click", validation);
function validation(event) {
    if (nomResa.validity.valueMissing || prenomResa.validity.valueMissing) {
    event.preventDefault();
    alert("Veuillez entrez vos nom et prénom avant de valider");

    } else {
    event.preventDefault();
    document.getElementById("canvas-container").style.display = "flex";
    var canvas1 = new Canvas(document.getElementById("canvasSignature"));
    alert("Merci de signer dans la fenêtre ci-dessous");
    }
}

var btnValidation = document.getElementById("btn-valider-signature");
var btnReset = document.getElementById("btn-rest-signature");
