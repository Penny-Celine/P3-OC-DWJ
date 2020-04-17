class Form {
    constructor() {

        this.submitBtn = document.getElementById("bouton-form-resa");
        this.nameBook = document.getElementById("nom-resa");
        this.firstNameBook = document.getElementById("prenom-resa");
        this.isValidForm();
    }

    isValidForm() {
        let name = this.nameBook;
        let firstName = this.firstNameBook;
        this.submitBtn.addEventListener("click", function (validation) {
            if (name.validity.valueMissing || firstName.validity.valueMissing) {
                validation.preventDefault();
                alert("Veuillez entrez vos nom et prénom avant de valider");
            } else {
                if (sessionStorage.getItem('name')){
                    validation.preventDefault();
                    document.getElementById("error-container").style.display = "block";
                    booking.override();
                } else {
                    validation.preventDefault();
                    console.log(document.getElementById("canvas-container").style.display);
                    if (document.getElementById("canvas-container").style.display === "") {
                        alert("Merci de signer dans la fenêtre ci-dessous");
                        document.getElementById("canvas-container").style.display = "flex";
                    } else {
                        alert("Vérifiez votre signature et cliquez sur le bouton 'Valider' pour confirmer la réservation.");
                    }
                }
            }
        })
    }
}


