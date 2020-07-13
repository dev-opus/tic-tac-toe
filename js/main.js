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

    const player = document.createElement('div');
    player.setAttribute('class','player');
    player.innerHTML = `<p>${getName()} <span>(${getMarker()})</span></p><span class='score'>${getScore()}</span>`;

    return {
        player,
        getScore,
        updateScore
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
});
