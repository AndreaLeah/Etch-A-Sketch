// Global Variable Declarations
const container = document.querySelector('.container')
const clearBtn = document.querySelector('.reset');
const viewWindow = document.querySelector('.view-window');
let gridSizeSelection = 16;
let array = [];
// color picker element & color from picker
const colorPicker = document.querySelector("#color-picker");
let chosenColor = colorPicker.value;
const eraserImg = document.getElementById("eraser-img");
let gridDivs = document.getElementsByClassName("divs");
const rainbowIcon = document.querySelector('#rainbow-img');
const slider = document.querySelector('.slider');
let sliderLabel = document.querySelector('.slider-label');
let randomColor = '';
let rainbowMode = false;
const borderRadius = "10px";
const rainbowImg = "rainbow-img";
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


// <<<<--------- FUNCTIONS ------------->>>> 

function createCanvas (gridSize, chosenColor) {
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    // Create 16x16 divs
    for (i = 0; i < (gridSize * gridSize); i++) {
        let div = document.createElement('div');
        div.classList.add("divs");
        div.addEventListener('mousedown', changeDivColor);
        div.addEventListener('mouseover', changeDivColor);
        container.appendChild(div);
    }
        // Proportionally Set Corners of Screen Divs To Be Rounded
        gridDivs[0].style.borderTopLeftRadius = borderRadius;
        gridDivs[gridSize - 1].style.borderTopRightRadius = borderRadius;
        gridDivs[(gridSize * gridSize) - 1].style.borderBottomRightRadius = borderRadius;
        gridDivs[(gridSize * gridSize) - gridSize].style.borderBottomLeftRadius = borderRadius;
    };

// Reset Grid Size
function gridReset(value) {
    // Clear Grid
    container.innerText = '';
    // Reset Grid
    createCanvas(value, chosenColor);
}

// Update Grid Size HTML Text
function updateSizeValue(value) {
    sliderLabel.textContent = `${value} x ${value}`;
};

function setPenColor(value) {
    if (value == rainbowImg) {
        randomColor = Math.floor(Math.random()*16777215).toString(16);
        chosenColor = `#${randomColor}`;
        rainbowMode = true;
        return chosenColor;
    }

    rainbowMode = false;
    chosenColor = value;
    return chosenColor;
};

function changeDivColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
        if (rainbowMode) {
            e.target.style.backgroundColor = setPenColor(rainbowImg);
        }

        e.target.style.backgroundColor = chosenColor;
};

function shakeIt() {
    setTimeout(addShakeIt);
    viewWindow.classList.remove('shake-it');
};

function addShakeIt () {
    viewWindow.classList.add('shake-it');
};

// <<<<---------EVENTS/EVENT LISTENERS --------->>>>

// Clear Screen on Click
clearBtn.addEventListener('click', function () {
    // Set Divs Background To White
    for(let i=0;i<gridDivs.length;i++) {
        gridDivs[i].style.backgroundColor = "#FFFFFF"; 
    };
});

colorPicker.onchange = (e) => setPenColor(e.target.value);
eraserImg.onclick = () => setPenColor('#FFFFFF');
rainbowIcon.onclick = () => setPenColor(rainbowImg);
slider.onchange = (e) => gridReset(e.target.value);
slider.onmousemove = (e) => updateSizeValue(e.target.value);
clearBtn.onclick = () => shakeIt();


// Initial Function Call
createCanvas(16, chosenColor);