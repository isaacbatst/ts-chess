import {Board} from '../../Board';
import {PieceColor} from '../../Piece';
import {PieceOnBoard} from '../../PieceOnboard';
import {Position} from '../../Position';

export class King extends PieceOnBoard {
	getAvailableMoves(board: Board): Position[] {
		const moves: Position[] = [];

		const rowIndex = this.getRowIndex();

		if (rowIndex < Board.rows.length - 1) {
			const nextRow = Board.rows[rowIndex + 1];
			const position = new Position(nextRow, this.position.col);
			const isPositionOccupied = board.isPositionOccupied(position);
			const isPositionOccupiedByEnemy = board.isPositionOccupiedByEnemy(position, this.color);

			if (!isPositionOccupied || isPositionOccupiedByEnemy) {
				moves.push(position);
			}
		}

		if (rowIndex > 0) {
			const previousRow = Board.rows[rowIndex - 1];
			const position = new Position(previousRow, this.position.col);
			const isPositionOccupied = board.isPositionOccupied(position);
			const isPositionOccupiedByEnemy = board.isPositionOccupiedByEnemy(position, this.color);

			if (!isPositionOccupied || isPositionOccupiedByEnemy) {
				moves.push(position);
			}
		}

		return moves;
	}
}
