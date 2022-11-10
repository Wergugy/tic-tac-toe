const game = (() => {
        let _turn = 0;

        const currentMark = () => {
                if ((_turn % 2) === 0) return 'X';
                else return '0';
        };

        const nextTurn = () => _turn++;

        const reset = () => _turn = 0;

        const start = () => {
                gameBoard.setUp();
                

        };

        return {currentMark, nextTurn, reset, start};
})();

const gameBoard = (() => {
        const _tiles = Array.from(document.querySelectorAll('.place'));

        const _placeMark = (e) => {
                e.preventDefault();
                e.target.textContent = game.currentMark;
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
