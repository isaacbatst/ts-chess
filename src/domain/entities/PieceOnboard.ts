import type {Board} from './Board';
import {Position} from './Position';

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

	abstract getAvailableMoves(board: Board): Position[];
}
