class Maps{
    constructor(){
        this.createMap();
        console.log('constructor');
        this.ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=amiens&apiKey=10afe1df07b32fdde96e4143d91886fb020a4b47", this.test());
        console.log(this.stations);
    }


    createMap(){
        this.mymap = L.map('map').setView([49.9, 2.3], 13);


        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoicGVubnktY2VsaW5lLW1weCIsImEiOiJjazdycmM3eXEwZ3Z1M2ZwbHlxemJkcDM1In0.5IXhN3NKp3WMnjJWeL6_qA"
        }).addTo(this.mymap);
    }

    // Exécute un appel AJAX GET
    // Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
    
    ajaxGet(url, callback) {
        console.log('ajaxGet');
        var req = new XMLHttpRequest();
        req.open("GET", url, callback);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        console.log(stations);
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    }

    test(response){
        console.log(response);
    }

    ajouterMarqueurs(reponse){
        
        var customIcon = L.icon({
            iconUrl: 'images/marker.png',
        
            iconSize:     [48, 48], // size of the icon

            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        var stations = JSON.parse(reponse); 
        var markers = L.markerClusterGroup(); /*création d'un groupe de clusters pour afficher les marqueurs*/
        stations.forEach(function (station) {

            /* Création des marqueurs*/
            var marker = L.marker([station.position.lat, station.position.lng], {icon: customIcon});
        
            markers.addLayer(marker);


            /* affichage des infos stations au clic sur un marqueur */
            marker.addEventListener("click", function() {
                document.getElementById("station-infos-container").style.display = "block";
                if (station.status == "OPEN") {
                    document.getElementById("nom-station").innerHTML = station.name;
                    document.getElementById("adresse-station").innerHTML = station.address;
                    document.getElementById("capacité-station").innerHTML = station.bike_stands;
                    document.getElementById("velos-dispos").innerHTML = station.available_bikes;
                } else {
                    document.getElementById("station-infos-container").innerHTML = "<h2>Nom : " + station.name + "</h2><p style='color:red;'>Cette station est actuellement fermée<p>";
                }

            })
        })
        this.mymap.addLayer(markers);
    }
}

var mymap = new Maps();
console.log(mymap);
