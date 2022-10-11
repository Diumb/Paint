import { addEventsMethods } from "./addEvents.js";

// Ctx Variables

const canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext("2d");

let drawSettings = {
    color: "white",
    form: "square",
    size: 5,
}
      
// Paint Variables

const buttonTools = document.querySelectorAll(".paint__tool--btn"),
      inputTools = document.querySelectorAll(".paint__tool--input");
      

// Functions

function onMouseDown() {
    canvas.addEventListener("mousemove", draw);
}

function draw(event) {
    const x = event.pageX - canvas.offsetLeft,
          y = event.pageY - canvas.offsetTop;
    
    ctx.beginPath();

    ctx.fillStyle = drawSettings.color;
    ctx.strokeStyle = drawSettings.color;

    switch (drawSettings.form) {
        case ("square"):
            ctx.fillRect(x, y, drawSettings.size, drawSettings.size);
            break;
        
        case ("round"):
            ctx.arc(x, y, drawSettings.size, 0, 360);
            ctx.stroke();
            ctx.fill();
            break;
        
        case ("clear"):
            ctx.clearRect(x, y, drawSettings.size, drawSettings.size);
            break;
    }
}

function onMouseUp() {
    canvas.removeEventListener("mousemove", draw);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkButtons(btn) {
    const btnData = btn.getAttribute("data-tool");

    switch (btnData) {
        case ("square"):
            drawSettings.form = "square";
            break;
        
        case ("round"):
            drawSettings.form = "round";
            break;
        
        case ("clearBrush"):
            drawSettings.form = "clear";
            break;
        
        case ("clear"):
            clear();
            break;
    }
}

function checkInputs(input) {
    const inputData = input.getAttribute("data-tool");

    switch (inputData) {
        case ("color"):
            drawSettings.color = input.value;
            break;
        
        case ("size"):
            drawSettings.size = input.value;
            break;
        
        case ("bgColor"):
            canvas.style.background = input.value;
            break;
    }
}

// Events

canvas.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);

addEventsMethods.addEvents(buttonTools, "click", event => {
    checkButtons(event.currentTarget);
});
addEventsMethods.addEvents(inputTools, "input", event => {
    checkInputs(event.currentTarget);
});