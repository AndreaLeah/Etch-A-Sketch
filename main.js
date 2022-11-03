// Global Variable Declarations
const container = document.querySelector('.container'),
    clearBtn = document.querySelector('.reset'),
    viewWindow = document.querySelector('.view-window'),
    colorPicker = document.querySelector("#color-picker"),
    eraserImg = document.getElementById("eraser-img"),
    rainbowIcon = document.querySelector('#rainbow-img'), 
    slider = document.querySelector('.slider'),
    borderRadius = "10px",
    rainbowImg = "rainbow-img";

let gridSizeSelection = 16,
    array = [];
    chosenColor = colorPicker.value,
    gridDivs = document.getElementsByClassName("divs"),
    sliderLabel = document.querySelector('.slider-label'),
    randomColor = '',
    rainbowMode = false,
    mouseDown = false,
    selectedItems = document.querySelectorAll(".selected-items"),
    selectedClass = document.getElementsByClassName("selected");

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


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
        div.addEventListener('touchmove', changeDivColor);
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
    console.log(value);
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
    console.log(e);
    console.log(e.target);
    console.log(e.type);

    if (e.type == 'touchmove') {


        let x = e.changedTouches[0].clientX;
        let y = e.changedTouches[0].clientY;

        console.log(`This is x: ${x}`);
        console.log(`This is y: ${y}`);

        target = document.elementFromPoint(x, y);
        console.log(`This is the target ${target}`);

        if (target.className === "divs") {
            if (rainbowMode) {
                target.style.backgroundColor = setPenColor(rainbowImg);
                }
        
            target.style.backgroundColor = chosenColor;
        }
    } else {

    if (e.type === 'mouseover' && !mouseDown) {
        return
    }
    if (rainbowMode) {
        e.target.style.backgroundColor = setPenColor(rainbowImg);
        }

    e.target.style.backgroundColor = chosenColor;
}};

function shakeIt() {
    setTimeout(addShakeIt);
    viewWindow.classList.remove('shake-it');
};

function addShakeIt () {
    viewWindow.classList.add('shake-it');
};

function removeSelectedClass () {
    selectedItems.forEach(item => {
        item.classList.remove("selected");
})};

// <<<<---------EVENTS/EVENT LISTENERS --------->>>>

// Clear Screen on Click
clearBtn.addEventListener('click', function () {
    shakeIt();
    removeSelectedClass();
    // Set Divs Background To White
    for(let i=0;i<gridDivs.length;i++) {
        gridDivs[i].style.backgroundColor = "#FFFFFF"; 
    };
});

// Event Handlers
colorPicker.onclick = (e) => setPenColor(e.target.value);
colorPicker.onchange = (e) => setPenColor(e.target.value);
eraserImg.onclick = () => setPenColor('#FFFFFF');
rainbowIcon.onclick = () => setPenColor(rainbowImg);
slider.onchange = (e) => gridReset(e.target.value);
slider.onmousemove = (e) => updateSizeValue(e.target.value);
slider.addEventListener('touchmove', (e) => updateSizeValue(e.target.value));


// Onclick, Add Background Color To Selection
selectedItems.forEach(item => {
    item.addEventListener('click', event => {
        if (selectedClass.length > 0) {
        removeSelectedClass();
        };

        item.classList.add("selected");
    })
})



// Initial Function Call
createCanvas(16, chosenColor);