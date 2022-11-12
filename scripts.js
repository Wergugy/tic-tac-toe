const player = (name, mark) => {
        return {name, mark};
};

const gameBoard = (() => {
        const _tiles = Array.from(document.querySelectorAll('td.place'));
 
        const _placeMark = (e) => {
                e.preventDefault();
                e.target.textContent = game.currentMark();
                game.nextTurn();
        };
        
        const setUp = () => {
                _tiles.forEach(t => t.addEventListener('click', _placeMark, {once:true}));
        };

        const reset = () => {
                _tiles.forEach(t => t.textContent = null);
        };

        const lock = () => {
                _tiles.forEach(t => t.removeEventListener('click', _placeMark, {once:true}));
        };

        const checkTiles = (mark) => {
                switch (true) { 
                        case _tiles.filter(t => t.classList.contains('r1'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        case _tiles.filter(t => t.classList.contains('r2'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        case _tiles.filter(t => t.classList.contains('r3'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        case _tiles.filter(t => t.classList.contains('c1'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        case _tiles.filter(t => t.classList.contains('c2'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        case _tiles.filter(t => t.classList.contains('c3'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        case _tiles.filter(t => t.classList.contains('d1'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        case _tiles.filter(t => t.classList.contains('d2'))
                                .every(t => t.textContent === mark):
                                        mark = true;
                                        break;
                        default:
                                mark = false;
                };
                return mark;
        };

        return {setUp,reset, checkTiles, lock};
})();


const game = (() => {
        let _turn = 0
        ,_player1
        ,_player2;

        const _checkWinner = () => {
                if (gameBoard.checkTiles(_player1['mark'])) {
                        console.log(`${_player1['name']} Wins!`);
                        _end();
                }
                else if (gameBoard.checkTiles(_player2['mark'])) {
                        console.log(`${_player2['name']} Wins!`);
                        _end();
                }
                else if (_turn === 9) console.log('Its a Tie!');
        };

        const _makePlayers = () => {
                _player1 = player('Jimothy', 'X')
                _player2 = player('Hestophar', 'O');
        };

        const _end = () => {
                gameBoard.lock();
        };

        const currentMark = () => {
                if ((_turn % 2) === 0) return 'X';
                else return 'O';
        };

        const nextTurn = () => {
                _turn++;
                _checkWinner();
        };

        const start = (e) => {
                if (e) {
                e.preventDefault();
                _turn = 0;
                _makePlayers();
                gameBoard.reset();
                gameBoard.setUp();
                }
                else return;
               
        };

        

        return {currentMark, nextTurn, start};
})();

document.querySelector('.play').addEventListener('click', game.start());


