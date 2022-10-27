import {Board} from '../../Board';
import {PieceColor} from '../../Piece';
import {PieceOnBoard} from '../../PieceOnboard';
import {Position} from '../../Position';

export class King extends PieceOnBoard {
	getAvailableMoves(board: Board): Position[] {
		const moves: Position[] = [];

		const rowIndex = this.getRowIndex();
		const colIndex = this.getColIndex();

		if (rowIndex < Board.rows.length - 1) {
			const nextRow = Board.rows[rowIndex + 1];
			const position = new Position(nextRow, this.position.col);

			if (this.isPossibleMove(board, position)) {
				moves.push(position);
			}
		}

		if (rowIndex > 0) {
			const previousRow = Board.rows[rowIndex - 1];
			const position = new Position(previousRow, this.position.col);

			if (this.isPossibleMove(board, position)) {
				moves.push(position);
			}
		}

		if (colIndex > 0) {
			const previousCol = Board.cols[colIndex - 1];
			const position = new Position(this.position.row, previousCol);

			if (this.isPossibleMove(board, position)) {
				moves.push(position);
			}
		}

		if (colIndex < Board.cols.length - 1) {
			const nextCol = Board.cols[colIndex + 1];
			const position = new Position(this.position.row, nextCol);

			if (this.isPossibleMove(board, position)) {
				moves.push(position);
			}
		}

		return moves;
	}

	private isPossibleMove(board: Board, position: Position): boolean {
		const isPositionOccupied = board.isPositionOccupied(position);
		const isPositionOccupiedByEnemy = board.isPositionOccupiedByEnemy(position, this.color);

		return (!isPositionOccupied || isPositionOccupiedByEnemy);
	}
}
