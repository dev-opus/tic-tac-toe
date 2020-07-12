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
    player.setAttribute('class', 'player');
    player.innerHTML = `<p>${getName()} <span>(${getMarker()})</span></p><span class='score'>${getScore()}</span>`;

    return {
        player,
        getScore,
        updateScore
    }
}
