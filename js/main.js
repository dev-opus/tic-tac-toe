/*
    GLOBAL VARIABLES
*/

let name1
let name2
let player1
let player2

/* 
    PLAYER OBJECT SECTION
*/

const PlayerObjectFactory = (name, marker) => {
    let playerName = name;
    let playerMarker = marker

    let score = 0;
    const updateScore = () => score++;

    const getName = () => playerName;
    const getMarker = () => playerMarker;
    const getScore = () => score;
    const resetScore = () => score = 0;

    const render = document.createElement('div');
    render.setAttribute('class','player');
    render.innerHTML = `<p>${getName()} <span>(${getMarker()})</span></p><span class='score'>${getScore()}</span>`;

    return {
        render,
        getScore,
        updateScore,
        resetScore,
        getMarker,
        getName
    }
}

/*
    ========================================================================================================================
    ========================================================================================================================
*/

/* 
    GAMEBOARD OBJECT SECTION
*/

const gameboard = (() => {
    let markers = [];
    const addMark = (mark) => markers.push(mark);
    const currentMark = () => markers[markers.length - 1];
    const resetMarkers = () => markers = [];

    const cells = Array.from(document.querySelectorAll('.cell'))

    const winningArrays = {
        a: [cells[0], cells[1], cells[2]],
        b: [cells[3], cells[4], cells[5]],
        c: [cells[6], cells[7], cells[8]],
        d: [cells[0], cells[3], cells[6]],
        e: [cells[1], cells[4], cells[7]],
        f: [cells[2], cells[5], cells[8]],
        g: [cells[6], cells[4], cells[2]],
        h: [cells[0], cells[4], cells[8]],
    } 

    return {
        addMark,
        currentMark,
        cells,
        winningArrays,
        resetMarkers
    }
})();  

/* 
    ==============================================================================================================
    ==============================================================================================================
*/

/*
    START/RESTART SECTION
*/


const start = document.querySelector('.start-restart');
start.addEventListener('click', () => {

    if (start.innerText === 'start') {
        name1 = document.getElementById('player1').value.toUpperCase();
        name2 = document.getElementById('player2').value.toUpperCase();

        if (!name1 || !name2) {
            alert('Player list is incomplete!!!')
            return 1
        }

        player1 = PlayerObjectFactory(name1, 'X')
        player2 = PlayerObjectFactory(name2, 'O')

        const holder = document.querySelector('.player-section')
        const referenceElem = document.querySelector('.versus')

        holder.removeChild(holder.firstElementChild)
        holder.removeChild(holder.lastElementChild)

        referenceElem.insertAdjacentElement("beforebegin", player1.render)
        referenceElem.insertAdjacentElement("afterend", player2.render)

        const board = document.querySelector('.gameboard-container')
        board.classList.toggle('hidden')

        return start.innerText = 'restart'
    }

    if (start.innerText === 'restart') {
        const decider = prompt('Do you really want to restart the game at this point (yes/no)?', 'no');
        if (decider.toLowerCase() === 'no') return 0;

        if (decider.toLowerCase() === 'yes') {
            const board = document.querySelector('.gameboard-container')

            const holder = document.querySelector('.player-section')
            holder.removeChild(holder.firstElementChild)
            holder.removeChild(holder.lastElementChild)

            const referenceElem = document.querySelector('.versus')
            const addHTML = (num) => `<div class="player"><p>Player ${num}</p> <input type="text" id="player${num}"></div>`;

            referenceElem.insertAdjacentHTML("beforebegin", addHTML(1))
            referenceElem.insertAdjacentHTML("afterend", addHTML(2))

            /* 
                INSIDE THIS CHAMBER IS WHERE I GET TO:

                    1 - DELETE ALL THE ITEMS IN THE GAMEBOARD ARRAY 
                    2 - DELETE ALL THE CONTENTS ON THE CELLS OF THE GAMEBOARD
                    3 - RESET THE PLAYERs SCORE
            */

            board.classList.toggle('hidden')
            return start.innerText = 'start'
        }
    }
});
