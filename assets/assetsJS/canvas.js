class Canvas{
	constructor(element){
		this.canvas = element;
    this.ctx = this.canvas.getContext("2d");
    this.posX = 0;
    this.posY = 0;
    this.isDrawing = false;
    this.canvas.width = 250;
    this.canvas.height = 200;
    this.rect = this.canvas.getBoundingClientRect();
    this.moves = 0;
    this.signature = false;
    // RAZ du canvas à chaque rechargement de celui-ci
    this.clearCanvas();
    this.getEvent();
  }
  

  getEvent(){
    
    // On ajoute les gestionnaires d'évènements pour mousedown, mousemove
    // et mouseup
    this.canvas.addEventListener('mousedown', event => {
      this.posX = event.offsetX - this.canvas.offsetLeft; // Récupère X au click
      this.posY = event.offsetY - this.canvas.offsetTop; // Récupère Y au click
      this.isDrawing = true;
    });

    this.canvas.addEventListener('mousemove', event => {
      if (this.isDrawing === true) {
        // si mousedown, alors on dessine avec paramètres X et Y de mousedown + X et Y en tps réel quand mousemove
        this.drawLine(this.posX, this.posY, event.offsetX - this.canvas.offsetLeft , event.offsetY - this.canvas.offsetTop);
        this.posX = event.offsetX - this.canvas.offsetLeft;
        this.posY = event.offsetY - this.canvas.offsetTop;
        this.moves ++;
      }
    });

    window.addEventListener('mouseup', event => {
      if (this.isDrawing === true) {
        // mouseup = on dessine la dernière position et on arrête
        this.drawLine(this.posX, this.posY, event.offsetX - this.canvas.offsetLeft, event.offsetY - this.canvas.offsetTop);
        this.posX = 0;
        this.posY = 0;
        this.isDrawing = false;
        if (this.moves > 3) {
          this.signature = true;
        } else {
          this.signature = false;
        }
      }
    });
//    gestion des TouchEvents


    this.canvas.addEventListener('touchstart', touchEvent => {
      let touch = touchEvent.touches;
      let mouseEvent = new MouseEvent("mousedown", {
        x: touch.clientX - this.rect.left,
        y: touch.clientY - this.rect.top
      });
      this.canvas.dispatchEvent(mouseEvent);
    });


    this.canvas.addEventListener('touchmove', touchEvent => {
      if (this.isDrawing === true) {
        touchEvent.preventDefault();     
        let touch = touchEvent.touches;
        let mouseEvent = new MouseEvent("mousemove", {
          x: touch.clientX - this.rect.left,
          y: touch.clientY - this.rect.top
      });
      this.canvas.dispatchEvent(mouseEvent);
      }
    });

    window.addEventListener('touchend', touchEvent => {
      if (this.isDrawing === true) {
        let touch = touchEvent.touches;
        let mouseEvent = new MouseEvent("mouseup", {
          x: touch.clientX - this.rect.left,
          y: touch.clientY - this.rect.top 
        });
        this.canvas.dispatchEvent(mouseEvent);
      }
    });
  }

  drawLine(x1, y1, x2, y2){
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = 'Black';
    this.ctx.lineWidth = 6;
    this.ctx.stroke();
    console.log("Drawing a line");
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 250, 200);
    this.signature = false;
  }

  

}


