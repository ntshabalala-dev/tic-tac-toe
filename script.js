let boardPlacements = {
    h1:[],
    h2:[],
    h3:[],

    v1:[],
    v2:[],
    v3:[],

    c1:[],
    c2:[],
}

const playedPositions = [];

function winningCombinations() {
    let h1 = [0,1,2];
    let h2 = [3,4,5];
    let h3 = [6,7,8];

    let v1 = [0,3,6];
    let v2 = [1,4,7];
    let v3 = [2,5,8];

    let c1 = [0,4,8];
    let c2 = [2,4,6];

    // const j = {
    //     h1:[],
    //     h2:[],
    //     h3:[],

    //     v1:[],
    //     v2:[],
    //     v3:[],

    //     c1:[],
    //     c2:[],
    // }


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

function placePosition(position, player) {
    // Needs to be stored in local storage
    if (playedPositions.includes(position)) {
        console.log('Position played already. Position:', position);
        return;
    }

    // &&& check for x & os string

    playedPositions.push(position);

    switch (position) {
        case 0:
            addToBoard(['h1', 'v1', 'c1'], position, player);
            break;
        case 1:
            addToBoard(['h1', 'v2'], position, player);
            break;
        case 2:
            addToBoard(['h1', 'v3', 'c2'], position, player);
            break;
        case 3:
            addToBoard(['h2', 'v1'], position, player);
            break;
        case 4:
            addToBoard(['h2', 'v2', 'c1', 'c2'], position, player);
            break;
        case 5:
            addToBoard(['h2', 'v3'], position, player);
            break;
        case 6:
            addToBoard(['h3', 'v1', 'c2'], position, player);
            break;
        case 7:
            addToBoard(['h3', 'v2'], position, player);
            break;
        case 8:
            addToBoard(['h3', 'v3', 'c1'], position, player);
            break;
        default:
            console.log('position not found');
            break;
    }
}

function addToBoard(params, position, player) {
    params.forEach(element => {
        const count = boardPlacements[element].push({
            [player]:position
        });
        

        if (count == 3) {
            if (result = threePlacements(element, player)) {
                console.log(result);
                
                return result;
            }
            // Continue playing
            return;
        }
    });
}

function threePlacements(placement, player) {
    const mappedPositions = boardPlacements[placement].map((obj) => Object.values(obj)[0]).sort((a,b) => a - b);
    const mappedPlayers = boardPlacements[placement].map((obj) => Object.keys(obj)[0]+'');
    const firstCondition = mappedPlayers.every((currentValue) => currentValue == player)
    let secondCondition = false

    console.log(mappedPositions);
    
    // limit to params
    winningCombinations().forEach((combination) => {
        combination.every((element, index) => {
            if (element === mappedPositions[index] && ! secondCondition) {
                secondCondition = true;
                return false;
            }
        })
    });

    if (firstCondition && secondCondition) {
        return {player:player, winningCombination:placement};
    } else {
        return null;
    }
}


placePosition(2, 'x');
placePosition(4, 'x');
placePosition(6, 'x');
// placePosition(6, 'o');

// console.log(boardPlacements);
// console.log(playedPositions);
// console.log(winningCombinations()[0]);


(function name(params) {
    const players = {
        players:[],
        init: function () {
            // not rendering anuthing
            // cachedom for buttos & input
            // bindEvents
        },
    }

    players.init();
})();

