import { addEventsMethods } from "./addEvents.js";

// Ctx Variables

const canvas = document.querySelector(".canvas"),
      ctx = canvas.getContext("2d");

let drawSettings = {
    color: "white",
    form: "square",
    size: 5,
    mode: "brush",
    path: "none",
}
      
// Paint Variables

const buttonTools = document.querySelectorAll(".paint__tool--btn"),
      inputTools = document.querySelectorAll(".paint__tool--input");
      

// Functions

function onMouseDown() {
    canvas.addEventListener("mousemove", draw);
}

function draw(event) {
    if (drawSettings.mode == "brush") {
        const x = event.pageX - canvas.offsetLeft,
              y = event.pageY - canvas.offsetTop;
        
        ctx.beginPath();

        ctx.fillStyle = drawSettings.color;
        ctx.strokeStyle = drawSettings.color;

        checkBrushes(x, y);
    }
}

function onMouseUp() {
    canvas.removeEventListener("mousemove", draw);
}

function checkBrushes(x, y) {
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

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkButtons(btn) {
    const btnData = btn.getAttribute("data-tool");

    switch (btnData) {
        case ("square"):
            drawSettings.form = "square";
            drawSettings.mode = "brush";
            break;
        
        case ("round"):
            drawSettings.form = "round";
            drawSettings.mode = "brush";
            break;
        
        case ("clearBrush"):
            drawSettings.form = "clear";
            drawSettings.mode = "brush";
            break;
        
        case ("clear"):
            clear();
            break;
        
        case ("lineBrush"):
            drawSettings.mode = "line";
            reloadSettings();
            break;
        
        case ("newPath"):
            drawSettings.path = "start";
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

function lineBrush(event) {
    const x = event.pageX - canvas.offsetLeft,
          y = event.pageY - canvas.offsetTop;
          
    if (drawSettings.mode == "line") {
        switch (drawSettings.path) {
            case ("start"):
                ctx.beginPath();
                ctx.moveTo(x, y);
                drawSettings.path = "process";
                ctx.stroke();
            break;
            
            case ("process"):
                ctx.lineTo(x, y);
                ctx.stroke();
            break;
        }
    }
}

function reloadSettings() {
    ctx.strokeStyle = drawSettings.color;
    ctx.lineWidth = drawSettings.size;
}

// Events

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("click", event => lineBrush(event));
document.addEventListener("mouseup", onMouseUp);

addEventsMethods.addEvents(buttonTools, "click", event => {
    checkButtons(event.currentTarget);
});
addEventsMethods.addEvents(inputTools, "input", event => {
    checkInputs(event.currentTarget);
});