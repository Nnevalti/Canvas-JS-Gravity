var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: innerWidth /2,
    y: innerHeight /2
};

var colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];

var gravity = 0.9;
var friction = 0.8;

addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

addEventListener('click', function(){
    init();
});

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dy, dx, radius, color){

    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;

    this.update = function(){
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

}
var ball;
var ballArray = [];
function init(){
    ballArray = [];
    for(var i = 0; i < 100; i++){
        var radius = randomIntFromRange(8, 20);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(radius, canvas.height - radius);
        var dx = randomIntFromRange(-2,2);
        var dy = randomIntFromRange(-2,2);
        var color = randomColor(colors);
        ballArray.push(new Ball(x, y, dy, dx, radius, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    for(var i = 0; i < ballArray.length; i++){
        ballArray[i].update();
    }
}

init();
animate();