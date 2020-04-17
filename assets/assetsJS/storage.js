class Storage {
    constructor() {
        this.containerToDisplay = document.getElementById("confirm-resa");
        this.bookedStationInfo = document.getElementById("station-confirm");
        this.bikerName = document.getElementById("nom-confirm");
        this.timer = document.getElementById("temps-restant");
        this.checkSessionStorage();
        this.checkLocalStorage();
    }

    checkSessionStorage() {
        let container = this.containerToDisplay;
        let station = this.bookedStationInfo;
        let name = this.bikerName;
        let timer = this.timer;
        if (this.storageAvailable('sessionStorage')) {
            if (sessionStorage.getItem('stationName')) {
                name.innerHTML = sessionStorage.getItem('name') + " " + sessionStorage.getItem('firstName');
                station.innerHTML = sessionStorage.getItem('stationName') + " " + sessionStorage.getItem('stationAddress');
                
                timer.innerHTML = sessionStorage.getItem('minTimer') + " minutes et " + sessionStorage.getItem('secTimer') + " secondes";
                let remainTime = (sessionStorage.minTimer * 60 * 1000) + (sessionStorage.secTimer * 1000);
                let refreshTimer = new Timer(remainTime);
                refreshTimer.countdown(remainTime);

                container.style.display = "block";
                container.style.top = 0;
                
            } 
        } else {
            alert('problème de stockage dans la session');
        }
    }

    checkLocalStorage() {
        let localName = localStorage.getItem('name');
        let localFirstName = localStorage.getItem('firstName');
        let formName = document.getElementById('nom-resa');
        let formFirstName = document.getElementById('prenom-resa');
        if (this.storageAvailable('localStorage')) {
            if (localStorage.getItem('name')) {
                formName.value = localName;
                formFirstName.value = localFirstName;
            }
        } else {
            alert('problème de stockage dans le local');
        }
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
