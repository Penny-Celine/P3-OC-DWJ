class Timer {
    constructor(duration) {
        this.duration = duration;
        this.interval;
        
    }

    countdown() {

        let start = new Date().getTime();

        let countDownDate = start + this.duration;
        
         // Update the count down every 1 second
        const intervalId = setInterval(function() {

            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for minutes and seconds
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element confirm-resa"
            document.getElementById("temps-restant").innerHTML = minutes + "minutes et " + seconds + "secondes";

            // Save it to the sessionStorage
            sessionStorage.setItem('minTimer', minutes);
            sessionStorage.setItem('secTimer', seconds);

            // If the count down is finished, remove booking and write some text
            if (distance <= 0) {
                window.clearInterval(intervalId);
                document.getElementById("temps-restant").innerHTML = "RESERVATION EXPIREE";
                sessionStorage.clear();
            }
        }, 1000);
        this.interval = intervalId;
    }


    resetTimer() {
        clearInterval(this.interval);
        sessionStorage.clear();
    }
}