import type {Board} from './Board';
import {Col, Position, Row} from './Position';

export enum PieceColor {
	WHITE = 'WHITE',
	BLACK = 'BLACK',
}

export abstract class PieceOnBoard {
	constructor(
		readonly id: string,
		protected position: Position,
		readonly color: PieceColor,
	) {
	}

	public move(board: Board, to: {row: string; col: string}) {
		const availableMoves = this.getAvailableMoves(board);

		const isMoveAvailable = availableMoves
			.some(move => move.col === to.col && move.row === to.row);

		if (!isMoveAvailable) {
			throw new Error('MOVEMENT_NOT_AVAILABLE');
		}

		this.position = new Position(to.row, to.col);
	}

	public getPosition() {
		return this.position;
	}

	public getRowIndex() {
		const rows = Object.keys(Row) as Row[];
		const rowIndex = rows.findIndex(row => row === this.position.row);

		if (rowIndex < 0) {
			throw new Error('ROW_NOT_FOUND');
		}

		return rowIndex;
	}

	public getColIndex() {
		const cols = Object.keys(Col) as Col[];
		const colIndex = cols.findIndex(col => col === this.position.col);

		if (colIndex < 0) {
			throw new Error('COL_NOT_FOUND');
		}

		return colIndex;
	}

	abstract getAvailableMoves(board: Board): Position[];
}
