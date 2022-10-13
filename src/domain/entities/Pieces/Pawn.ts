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
		const rows = Object.keys(Row) as Row[];
		const actualRowIndex = rows.findIndex(row => row === this.position.row);

		if (actualRowIndex < 0) {
			throw new Error('ROW_NOT_FOUND');
		}

		if (this.color === PieceColor.WHITE) {
			return this.getWhiteMoves(actualRowIndex, board);
		}

		return this.getBlackMoves(actualRowIndex, board);
	}

	private getWhiteMoves(actualRowIndex: number, board: Board): Position[] {
		const rows = Object.keys(Row) as Row[];
		const availableMoves: Position[] = [];
		const lastRowIndex = rows.length - 1;

		for (let index = actualRowIndex; index <= lastRowIndex; index += 1) {
			const nextRow = rows[index + 1];
			const newPosition = new Position(Row[nextRow], this.position.col);
			if (board.isPositionOccupied(newPosition)) {
				break;
			}

			availableMoves.push(newPosition);
		}

		return availableMoves;
	}

	private getBlackMoves(actualRowIndex: number, board: Board): Position[] {
		const rows = Object.keys(Row) as Row[];
		const availableMoves: Position[] = [];
		const lastRowIndex = 0;

		for (let index = actualRowIndex; index > lastRowIndex; index -= 1) {
			const nextRow = rows[index - 1];
			const newPosition = new Position(Row[nextRow], this.position.col);

			if (board.isPositionOccupied(newPosition)) {
				break;
			}

			availableMoves.push(newPosition);
		}

		return availableMoves;
	}
}
