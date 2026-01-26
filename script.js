let boardPlacements = {
    h1: [],
    h2: [],
    h3: [],

    v1: [],
    v2: [],
    v3: [],

    c1: [],
    c2: [],
}

const playedPositions = [];

function winningCombinations() {
    let h1 = [0, 1, 2];
    let h2 = [3, 4, 5];
    let h3 = [6, 7, 8];

    let v1 = [0, 3, 6];
    let v2 = [1, 4, 7];
    let v3 = [2, 5, 8];

    let c1 = [0, 4, 8];
    let c2 = [2, 4, 6];

    return [
        h1,
        h2,
        h3,
        v1,
        v2,
        v3,
        c1,
        c2
    ];
}

// function placePosition(position, player) {
//     // Needs to be stored in local storage
//     if (playedPositions.includes(position)) {
//         console.log('Position played already. Position:', position);
//         return;
//     }

//     // &&& check for x & os string

//     playedPositions.push(position);

//     switch (position) {
//         case 0:
//             addToBoard(['h1', 'v1', 'c1'], position, player);
//             break;
//         case 1:
//             addToBoard(['h1', 'v2'], position, player);
//             break;
//         case 2:
//             addToBoard(['h1', 'v3', 'c2'], position, player);
//             break;
//         case 3:
//             addToBoard(['h2', 'v1'], position, player);
//             break;
//         case 4:
//             addToBoard(['h2', 'v2', 'c1', 'c2'], position, player);
//             break;
//         case 5:
//             addToBoard(['h2', 'v3'], position, player);
//             break;
//         case 6:
//             addToBoard(['h3', 'v1', 'c2'], position, player);
//             break;
//         case 7:
//             addToBoard(['h3', 'v2'], position, player);
//             break;
//         case 8:
//             addToBoard(['h3', 'v3', 'c1'], position, player);
//             break;
//         default:
//             console.log('position not found');
//             break;
//     }
// }


const playedPositions2 = new Set();

function placePosition(position, player) {


    // Check if the position is valid
    if (position < 0 || position > 8) {
        console.error('Invalid position. Position must be between 0 and 8.');
        return;
    }

    // Check if the position has already been played
    if (playedPositions2.has(position)) {
        console.log('Position played already. Position:', position);
        return;
    }

    // Mark the position as played
    playedPositions2.add(position);

    // Map positions to their corresponding elements
    const positionMap = [
        ['h1', 'v1', 'c1'],  // 0
        ['h1', 'v2'],          // 1
        ['h1', 'v3', 'c2'],  // 2
        ['h2', 'v1'],          // 3
        ['h2', 'v2', 'c1', 'c2'], // 4
        ['h2', 'v3'],          // 5
        ['h3', 'v1', 'c2'],  // 6
        ['h3', 'v2'],          // 7
        ['h3', 'v3', 'c1']   // 8
    ];

    // Get the corresponding position data from positionMap
    const posData = positionMap[position];
    if (!posData) return console.error('Invalid position');

    // Add the player's symbol to each element in the position
    console.log(posData, position, player);

    return addToBoard(posData, position, player);
}



function addToBoard(params, position, player) {
    params.forEach(element => {
        const count = boardPlacements[element].push({
            // add players move as a object to the boardPlacements key:val store. Example: {x:4}
            [player]: position
        });

        // check winner eligibility each time a winning combination gets 3 placements
        if (count == 3) {
            console.log('fuckkkkk', element);

            if (result = threePlacements(element, player)) {
                console.log(result);

                return result;
            }
            // Continue playing
            return -1;
        }
    });
}

function threePlacements(placement, player) {
    console.log('dsdsd', boardPlacements[placement]);
    let test = boardPlacements[placement][0];
    console.log("toets :", Object.keys(test));

    // Returns an array of player positions that were added to the boardplacements object ['0','4','8']
    const mappedPositions = boardPlacements[placement].map((obj) => Object.values(obj)[0]).sort((a, b) => a - b);
    // Returns an array of player symbols that were added to the boardplacements object ['x','x','x']
    const mappedPlayers = boardPlacements[placement].map((obj) => Object.keys(obj)[0] + '');
    // Check if each symbol placed is the same as the current players symbol. Example all items in ['x','x','x'] = player
    const firstCondition = mappedPlayers.every((currentValue) => currentValue == player)
    let secondCondition = false

    console.log('players', mappedPlayers);

    // limit to params
    winningCombinations().forEach((combination) => {
        combination.every((element, index) => {
            if (element === mappedPositions[index] && !secondCondition) {
                secondCondition = true;
                return false;
            }
        })
    });

    if (firstCondition && secondCondition) {
        return { player: player, winningCombination: placement };
    } else {
        return null;
    }
}


placePosition(0, 'x');
placePosition(4, 'x');
placePosition(8, 'x');
// placePosition(6, 'o');

console.log(boardPlacements);
// console.log(playedPositions);
// console.log(winningCombinations()[0]);


// (function name(params) {
//     const players = {
//         players: [],
//         init: function () {
//             // not rendering anuthing
//             // cachedom for buttos & input
//             // bindEvents
//         },
//     }

//     players.init();
// })();

