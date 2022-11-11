const game = (() => {
        let _turn = 0;

        const currentMark = () => {
                if ((_turn % 2) === 0) return 'X';
                else return 'O';
        };

        const nextTurn = () => {
                _turn++;
                if (_turn === 9);
        };

        const start = () => {
                _turn = 0;
                gameBoard.reset();
                gameBoard.setUp();
        };

        return {currentMark, nextTurn, start};
})();

const gameBoard = (() => {
        const _tiles = document.querySelectorAll('td.place');
 
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

        return {setUp,reset};
})();

const player = (name, mark) => {
      

        return {name, mark};
};
