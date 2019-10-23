import { parse } from '@babel/parser';

const createBoard = (rows, columns) => {
	return Array(rows).fill(0).map((_, row) => {
		return Array(columns).fill(0).map((_, column) => {
			return {
				row,
				column,
				opened: false,
				flagged: false,
				mined: false,
				exploded: false,
				nearMines: 0
			};
		});
	});
};

const spreadMines = (board, minesAmount) => {
	const rows = board.length;
	const columns = board[0].length;
	let minesPlanted = 0;

	while (minesPlanted < minesAmount) {
		const rowSel = parseInt(Math.random() * rows, 10);
		const columnSel = parseInt(Math.random() * columns, 10);
		board[rowSel][columnSel].mined=true
		minesPlanted++;
	}
};

const createMinedBoard = (rows, columns, minesAmount) => {
	const board = createBoard(rows, columns);
	spreadMines(board, minesAmount);
	return board;
};

const cloneBoard = board => {
	return board.map(rows => {
		return rows.map(field => {
			return { ...field };
		});
	});
};

const getNeightboors = (row, column, board) => {
	const neighboors = [];

	const rows = [ row - 1, row, row + 1 ];
	const columns = [ column - 1, column, column + 1 ];

	rows.forEach((r) => {
		columns.forEach((c) => {
			const diferent = r != row || c != column;
			const validRow = r >= 0 && r < board.length;
			const validColumn = c >= 0 && c < board[0].length;

			if (diferent && validRow && validColumn) {
				neighboors.push(board[r][c]);
			}
		});
	});
	return neighboors;
};

const safeNeighboors = (row, column, board) => {
	const safes = (result, neighboor) => result && !neighboor.mined
	return getNeightboors(row, column, board).reduce(safes, true);
};

const openField = (row, column, board) => {
	const field = board[row][column];

	if (!field.opened) {
		field.opened = true;

		if (field.mined) {
			field.exploded = true;
		} else if (safeNeighboors(row, column, board)) {
			getNeightboors(row, column, board)
			.forEach((n) => openField(n.row, n.column, board)) 
		} else {
			const neighboors = getNeightboors(row, column, board);
			field.nearMines = neighboors.filter((n) => n.mined).length;
		}
	}
};

const fields = board => [].concat(...board);
const hadExplosion = board => fields(board)
		.filter(field => field.exploded).length
const pedding = field => (field.mined && !field.flagged) || (!field.mined && !field.openend)
const wonGames = board => fields(board).filter(pedding).lenght === 0;
const showMines = board => fields(board).filter(field=>field.mined)
								.forEach(field=>field.opened=true)

const invertFlag = (board,row,colum) =>{
	const field = board[row][colum]
	field.flagged = !field.flagged
}

const flagsUsed = board => fields(board).filter(field=>field.flagged).length

export { 
	createMinedBoard,
	cloneBoard, 
	openField, 
	hadExplosion, 
	wonGames, 
	showMines, 
	invertFlag, 
	flagsUsed
 };
