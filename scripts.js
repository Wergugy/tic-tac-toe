
const gameBoard = (() => {
        const _tiles = Array.from(document.querySelectorAll('td.place'))
        , displayBox = document.querySelector('.contentInDisplay');

        const displayMark = () => {
                displayBox.textContent = `Next: ${game.currentMark()}`;
        };
 
        const _placeMark = (e) => {
                e.preventDefault();
                e.target.textContent = game.currentMark();
                game.nextTurn();
        };
        
        const setUp = () => {
                _tiles.forEach(t => t.addEventListener('click', _placeMark, {once:true}));
                displayMark();
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

        return {setUp, reset, checkTiles, lock, displayMark, displayBox};
})();


const game = (() => {
        let _turn = 0
        , _player1
        , _player2;

        const _playButton = document.querySelector('.play')
        , _playerOneName = document.querySelector('#playerOneName')
        , _playerOneMarkRadio = document.querySelectorAll('[name=markOne]')
        , _playerTwoName = document.querySelector('#playerTwoName')
        , _playerTwoMarkRadio = document.querySelectorAll('[name=markTwo]');

        const _switchMarks = () => {
                const radios = document.querySelectorAll('[type=radio]');
                radios.forEach((r) => r.addEventListener('click', (e) => {
                        if (e.target.getAttribute('name') === 'markOne') {
                                if (Array.from(_playerTwoMarkRadio).find(e => e.checked).value === e.target.value) {
                                        Array.from(_playerTwoMarkRadio).find(e => !(e.checked)).checked = true;
                                };
                        }
                        else if (e.target.getAttribute('name') === 'markTwo') {
                                if (Array.from(_playerOneMarkRadio).find(e => e.checked).value === e.target.value) {
                                        Array.from(_playerOneMarkRadio).find(e => !(e.checked)).checked = true;
                                };
                        }; 
                }));
        };

        const _player = (name, mark) => {
                return {name, mark};
        };

        const _checkWinner = () => {
                if (gameBoard.checkTiles(_player1['mark'])) {
                        gameBoard.displayBox.textContent = `${_player1['name']} Wins!`;
                        _end();
                }
                else if (gameBoard.checkTiles(_player2['mark'])) {
                        gameBoard.displayBox.textContent = `${_player2['name']} Wins!`;
                        _end();
                }
                else if (_turn === 9) gameBoard.displayBox.textContent = 'It\'s a Tie!';
        };

        const _makePlayers = () => { 
                const markOne = Array.from(_playerOneMarkRadio).find(e => e.checked).value;
                const markTwo = Array.from(_playerTwoMarkRadio).find(e => e.checked).value;
                _player1 = _player(_playerOneName.value, markOne);
                _player2 = _player(_playerTwoName.value, markTwo);
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
                gameBoard.displayMark();
                _checkWinner();
        };

        const _start = (e) => {
                e.preventDefault();
                _turn = 0;
                _makePlayers();
                gameBoard.reset();
                gameBoard.setUp();
        };
        
       const _initialize = () => {
                _playButton.addEventListener('click', _start);
                _switchMarks();
        };

        _initialize();

        return {currentMark, nextTurn};
})();


