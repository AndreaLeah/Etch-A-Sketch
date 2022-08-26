// Global Variable Declarations
let divvies = document.querySelectorAll('div');
const clearBtn = document.querySelector('.reset')


function divsWrapper (gridSize) {
    // Variable Declarations
    const container = document.querySelector('.container')
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    // Create 16x16 divs
    for (i = 0; i < (gridSize * gridSize); i++) {
        let divs = document.createElement('div');
        divs.classList.add('divs');
        container.insertAdjacentElement('beforeend', divs);
        divs.addEventListener('mouseover', function() {
            divs.style.backgroundColor = 'black';
        });
    }};

    divsWrapper(16);

    clearBtn.addEventListener('click', function () {
        location.reload();
    });


