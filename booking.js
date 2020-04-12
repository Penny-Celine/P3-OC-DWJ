class Booking {
    constructor(form) {
        this.form = form;
        this.canvas = signCanvas;
        this.btnValidation = document.getElementById("btn-valid-signature");
        this.btnReset = document.getElementById("btn-reset-signature");
        this.errorContainer = document.getElementById("error-container");
        this.overrideBtn = document.getElementById("btn-override");
        this.stationName = document.getElementById("nom-station");
        this.stationAddress = document.getElementById("adresse-station");
        this.timer = new Timer(1200000);;
        this.resetListen();
        this.validListen(); 
    }


    resetListen() {
        this.btnReset.addEventListener("click", clickBtn => {
            clickBtn.preventDefault();
            this.canvas.clearCanvas();

        })
    }

    validListen() {
        this.btnValidation.addEventListener("click", clickBtn => {
            let signOk = this.canvas.signature ;
            clickBtn.preventDefault();
            console.log(signOk);
            if (signOk === true ) {
                //Ici la réservation est validée, on lance le stockage d'infos de resa
                this.recordBook();
                console.log('Réservation valide');
                this.currentBooking = true;
                document.getElementById("station-infos-container").style.display = "none";
                document.getElementById("confirm-resa").style.top = 0;
            
            } else {
                alert('Vous devez signer le formulaire afin de valider votre réservation.');
            }
        });
    }


    recordBook() {
        let nameToStore = this.form.nameBook.value;
        let firstNameToStore = this.form.firstNameBook.value;
        let stationNameToStore = this.stationName.innerText;
        let stationAddressToStore = this.stationAddress.innerText;

        if (this.storageAvailable('localStorage')) {
            localStorage.setItem('name', nameToStore);
            localStorage.setItem('firstName', firstNameToStore);
        } else {
            alert('Stockage impossible sur votre navigateur');
        }

        if(this.storageAvailable('sessionStorage')) {
            if (sessionStorage.getItem('name')){
                this.errorContainer.style.display = "block";
                this.override();
            } else {
                sessionStorage.setItem('name', nameToStore);
                sessionStorage.setItem('firstName', firstNameToStore);
                sessionStorage.setItem('stationName', stationNameToStore);
                sessionStorage.setItem('stationAddress', stationAddressToStore);
                this.timer.countdown(1200000);
                document.getElementById('confirm-resa').style.display = "block";
                document.getElementById('station-confirm').innerHTML = this.stationName.innerText + " " + this.stationAddress.innerText;
                document.getElementById('nom-confirm').innerHTML = firstNameToStore + " " + nameToStore ;
            }
        }

    }

    override() {
        let confirmContainer = document.getElementById("confirm-resa");
        let stationInfoContainer = document.getElementById("station-infos-container");
        
        this.overrideBtn.addEventListener("click", clickBtn => {
            clickBtn.preventDefault();
            this.errorContainer.style.display = "none";
            confirmContainer.style.display = 'none';
            stationInfoContainer.style.display = "flex";
            sessionStorage.clear();
            this.timer.resetTimer();
            this.currentBooking = false;
        })
    }

    storageAvailable(type) {
        try {
            let storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(event) {
            return event instanceof DOMException && (
                // everything except Firefox
                event.code === 22 ||
                // Firefox
                event.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                event.name === 'QuotaExceededError' ||
                // Firefox
                event.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    }
}