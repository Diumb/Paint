const canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// Functions

function onMouseDown() {
    canvas.addEventListener("mousemove", draw);
}

function draw(event) {
    const x = event.pageX,
          y = event.pageY;
          
    ctx.fillRect(x, y, 5, 5);
}

function onMouseUp() {
    canvas.removeEventListener("mousemove", draw);
}

// Events

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);