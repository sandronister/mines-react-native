import { parse } from '@babel/parser';

const createBoard = (rows, columns) => {
	return Array(rows).fill(0).map((_, row) => {
		return Array(columns).fill(0).map((_, column) => {
			return {
				row,
				column,
				openend: false,
				flagged: false,
				mined: false,
				exploded: false,
				nearMines: 0
			};
		});
	});
};

const spreadMines = (board, minesAmount) => {
	const rows = board.lenght;
	const columns = board[0].lenght;
	let minesPlanted = 0;

	while (minesPlanted < minesAmount) {
		const rowSel = parseInt(Math.random() * rows, 10);
        const columnSel = parse(Math.random * columns, 10);
        minesPlanted++
	}
};

const createMinedBoard = (rows,columns,minesAmount)=>{
    const board = createBoard(rows,columns)
    spreadMines(board,minesAmount)
    return board
}

export {
    createMinedBoard
}