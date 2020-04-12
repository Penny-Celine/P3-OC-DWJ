/*Code js pour Cycloc */


/*Les fleches du clavier declenchent precedent et suivant */

document.addEventListener("keydown", function(toucheEnfoncée) {
    /*ici on cherche quelle ancre est active quand la touche est enfoncée*/
    
    if (window.location.hash == "#sl_i2") {
        if (toucheEnfoncée.key == "ArrowLeft") {
            document.getElementById("prev2").click();
        } else if (toucheEnfoncée.key == "ArrowRight") {
            document.getElementById("next2").click();
        }
    } else if (window.location.hash == "#sl_i3") {
        if (toucheEnfoncée.key == "ArrowLeft") {
            document.getElementById("prev3").click();
        } else if (toucheEnfoncée.key == "ArrowRight") {
            document.getElementById("next3").click();
        }
    } else if (window.location.hash == "#sl_i4") {
        if (toucheEnfoncée.key == "ArrowLeft") {
            document.getElementById("prev4").click();
        } else if (toucheEnfoncée.key == "ArrowRight") {
            document.getElementById("next4").click();
        }
    } else if (window.location.hash == "#sl_i5") {
        if (toucheEnfoncée.key == "ArrowLeft") {
            document.getElementById("prev5").click();
        } else if (toucheEnfoncée.key == "ArrowRight") {
            document.getElementById("next5").click();
        }
    } else if (window.location.hash == "#sl_i6") {
        if (toucheEnfoncée.key == "ArrowLeft") {
            document.getElementById("prev6").click();
        } else if (toucheEnfoncée.key == "ArrowRight") {
            document.getElementById("next6").click();
        }
    } else {
        if (toucheEnfoncée.key == "ArrowLeft") {
            document.getElementById("prev1").click();
        } else if (toucheEnfoncée.key == "ArrowRight") {
            document.getElementById("next1").click();
        }
    }

})
