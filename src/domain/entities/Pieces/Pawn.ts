import type {Board} from '../Board';
import {PieceColor, PieceOnBoard} from '../PieceOnboard';
import {Position, Row} from '../Position';

export class Pawn extends PieceOnBoard {
	private hasAlreadyMoved: boolean;

	constructor(id: string, position: Position, color: PieceColor, hasAlreadyMoved: boolean) {
		super(id, position, color);
		this.hasAlreadyMoved = hasAlreadyMoved;
	}

	move(board: Board, to: {col: string; row: string}) {
		super.move(board, to);

		if (!this.hasAlreadyMoved) {
			this.hasAlreadyMoved = true;
		}
	}

	getAvailableMoves(board: Board): Position[] {
		const rows = Object.keys(Row) as Row[];
		const actualRowIndex = rows.findIndex(row => row === this.position.row);

		if (actualRowIndex < 0) {
			throw new Error('ROW_NOT_FOUND');
		}

		const allowedSquares = this.hasAlreadyMoved ? 1 : 2;

		if (this.color === PieceColor.WHITE) {
			return this.getWhiteMoves(actualRowIndex, board, allowedSquares);
		}

		return this.getBlackMoves(actualRowIndex, board, allowedSquares);
	}

	private getWhiteMoves(actualRowIndex: number, board: Board, allowedSquares: number): Position[] {
		const rows = Object.keys(Row) as Row[];
		const availableMoves: Position[] = [];
		const lastRowIndex = rows.length - 1;

		for (let index = actualRowIndex; index <= lastRowIndex && index < actualRowIndex + allowedSquares; index += 1) {
			const nextRow = rows[index + 1];
			const newPosition = new Position(Row[nextRow], this.position.col);
			if (board.isPositionOccupied(newPosition)) {
				break;
			}

			availableMoves.push(newPosition);
		}

		return availableMoves;
	}

	private getBlackMoves(actualRowIndex: number, board: Board, allowedSquares: number): Position[] {
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
