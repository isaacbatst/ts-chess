import type {Board} from './Board';
import type {PieceColor} from './Piece';
import {Piece, PieceStatus} from './Piece';
import type {Position} from './Position';
import {Col, Row} from './Position';

export abstract class PieceOnBoard extends Piece {
	constructor(
		id: string,
		protected position: Position,
		color: PieceColor,
	) {
		super(id, PieceStatus.ONBOARD, color);
	}

	public move(board: Board, to: Position) {
		const availableMoves = this.getAvailableMoves(board);

		const isMoveAvailable = availableMoves
			.some(move => move.col === to.col && move.row === to.row);

		if (!isMoveAvailable) {
			throw new Error('MOVEMENT_NOT_AVAILABLE');
		}

		const pieceOnPosition = board.getPieceByPosition(to);

		if (pieceOnPosition) {
			board.capturePiece(pieceOnPosition);
		}

		this.position = to;
	}

	public getPosition() {
		return this.position;
	}

	public getColor() {
		return this.color;
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
