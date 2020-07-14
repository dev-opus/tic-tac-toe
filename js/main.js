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

    const player = document.createElement('div');
    player.setAttribute('class','player');
    player.innerHTML = `<p>${getName()} <span>(${getMarker()})</span></p><span class='score'>${getScore()}</span>`;

    return {
        player,
        getScore,
        updateScore,
        resetScore,
        getMarker
    }
}

const start = document.querySelector('.start-restart');

start.addEventListener('click', () => {

    if (start.innerText === 'start') {

        const name1= document.getElementById('player1').value.toUpperCase();
        const name2 = document.getElementById('player2').value.toUpperCase();

        if (!name1 || !name2) {
            alert('Player list is incomplete!!!')
            return
        }

        start.innerText = 'restart'

        const player1 = PlayerObjectFactory(name1, 'X')
        const player2 = PlayerObjectFactory(name2, 'O')

        const holder = document.querySelector('.player-section')
        const referenceElem = document.querySelector('.versus')

        holder.removeChild(holder.firstElementChild)
        holder.removeChild(holder.lastElementChild)

        referenceElem.insertAdjacentElement("beforebegin", player1.player)
        referenceElem.insertAdjacentElement("afterend", player2.player)

        const board = document.querySelector('.gameboard-container')
        board.classList.toggle('hidden')

        return
    }

    if (start.innerText === 'restart') {
        console.log('restart baby!!!')
        let decider = prompt('Do you really want to restart the game at this point (yes/no)?', 'no');

        if (decider.toLowerCase() === 'no') return (console.log('good boy :)'));

        if (decider.toLowerCase() === 'yes') {
            const board = document.querySelector('.gameboard-container')

            const holder = document.querySelector('.player-section')
            holder.removeChild(holder.firstElementChild)
            holder.removeChild(holder.lastElementChild)

            const inputElem1 = document.createElement('div')
            const inputElem2 = document.createElement('div')

            inputElem1.classList.toggle('player')
            inputElem2.classList.toggle('player')

            inputElem1.innerHTML = '<p>Player 1</p> <input type="text" id="player1">'
            inputElem2.innerHTML = '<p>Player 2</p> <input type="text" id="player2">'

            const referenceElem = document.querySelector('.versus')
            referenceElem.insertAdjacentElement("beforebegin", inputElem1)
            referenceElem.insertAdjacentElement("afterend", inputElem2)

            /* 
                INSIDE THIS CHAMBER IS WHERE I GET TO:

                    1 - DELETE ALL THE ITEMS IN THE GAMEBOARD ARRAY 
                    2 - DELETE ALL THE CONTENTS ON THE CELLS OF THE GAMEBOARD
                    3 - RESET THE PLAYERs SCORE
            */

            board.classList.toggle('hidden')
            start.innerText = 'start'
        }
    }
});
