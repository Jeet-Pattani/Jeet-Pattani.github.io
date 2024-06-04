const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0,canvas.height,canvas.width,0);
gradient.addColorStop(0, '#ff8400');
gradient.addColorStop(0.2, '#ff8400');
gradient.addColorStop(0.4, '#ff8400');
gradient.addColorStop(0.6, '#ff8400');
gradient.addColorStop(0.8, '#ff8400');
gradient.addColorStop(1 , '#000000a8');

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = '10';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text='';
        this.canvasHeight = canvasHeight;
    }
    draw(context) {
    this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));    
        context.fillText(this.text, this.x*this.fontSize, this.y*this.fontSize);
        if(this.y*this.fontSize>this.canvasHeight && Math.random()>0.9){
            this.y=0;
        }else{
            this.y+=1;
        }
    }
}
class Effect {

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 12;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);

    }
    #initialize() {
        for(let i=0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height); 
let lastTime = 0;
const fps = 30;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#ff8400';
        ctx.fillStyle = gradient;
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer=0;
    }else{
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}
animate(1);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
})