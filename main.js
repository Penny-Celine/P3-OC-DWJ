//Ici on instancie toutes les classes dont on a besoin au chargement de la page

//Classe Storage qui vérifie ce qui est stocké dans WebStorage
let checkStorage = new Storage();
//Classe Slider pour afficher les différentes slides à l'appui sur les flêches
let mySlider = new Slider();
//Classe Map qui affiche la carte de l'API Leaflet(mapbox pour l'Url source de la map)
//et y ajoute les marqueurs de l'API JC DECAUX pour les stations de vélos
let myMap = new Map();
//Classe Forms qui prend en charge le formulaire de réservation(nom + prénom)
let formBook = new Form();
//Classe Canvas qui va permettre de signer le formulaire (API Canvas)
let signCanvas = new Canvas(document.getElementById("canvasSignature"));
//Classe Booking qui va enregistrer la réservation SI validée 
//et lancer le compte à rebours (Classe Timer instanciée dans ce fichier)
let booking = new Booking(formBook);