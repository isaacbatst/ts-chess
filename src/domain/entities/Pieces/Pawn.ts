import type {Board} from '../Board';
import {Piece} from '../Piece';
import type {PieceOnBoard} from '../PieceOnboard';
import {PieceColor} from '../PieceOnboard';
import {Position} from '../Position';
import {Row} from '../Position';

export class Pawn extends Piece implements PieceOnBoard {
	constructor(
		readonly position: Position,
		readonly color: PieceColor,
	) {
		super('Pawn');
	}

	getAvailableMoves(board: Board): Position[] {
		if (this.isOnLastRow()) {
			return [];
		}

		const availableMoves: Position[] = [];
		const rows = Object.keys(Row) as Row[];
		const rowIndex = rows.findIndex(row => row === this.position.row);

		if (rowIndex < 0) {
			throw new Error('ROW_NOT_FOUND');
		}

		if (this.color === PieceColor.WHITE) {
			for (let index = rowIndex; index <= rows.length - 1; index += 1) {
				const newPosition = new Position(Row[rows[index]], this.position.col);
				if (board.isPositionOccupied(newPosition)) {
					break;
				}

				availableMoves.push();
			}
		}

		return availableMoves;
	}

	private isOnLastRow() {
		return (
			(this.color === PieceColor.WHITE && this.position.row === Row.EIGHT)
      || (this.color === PieceColor.BLACK && this.position.row === Row.ONE)
		);
	}
}
