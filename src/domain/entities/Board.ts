import type {PieceColor, PieceOnBoard} from './PieceOnboard';
import type {Position} from './Position';
import {Col, Row} from './Position';

export type MovingBoard = {
	movePiece(pieceId: string, to: {row: string; col: string}): void;
};

export class Board {
	static readonly rows = Object.keys(Row) as Row[];
	static readonly cols = Object.keys(Col) as Col[];
	readonly pieces: PieceOnBoard[] = [];

	public addPiece(pieceOnBoard: PieceOnBoard) {
		if (this.isPositionOccupied(pieceOnBoard.getPosition())) {
			throw new Error('POSITION_OCCUPIED');
		}

		this.pieces.push(pieceOnBoard);
	}

	public isPositionOccupied(position: Position) {
		return this.pieces.some(piece => {
			const piecePosition = piece.getPosition();

			return piecePosition.col === position.col && piecePosition.row === position.row;
		});
	}

	public isPositionOccupiedWithEnemy(position: Position, color: PieceColor) {
		return this.pieces.some(piece => {
			const piecePosition = piece.getPosition();

			return piecePosition.col === position.col
			&& piecePosition.row === position.row
			&& piece.color !== color;
		});
	}

	public movePiece(pieceId: string, to: {row: string; col: string}): void {
		const piece = this.pieces.find(piece => piece.id === pieceId);

		if (!piece) {
			throw new Error('PIECE_NOT_FOUND');
		}

		piece.move(this, to);
	}

	public getPieceAvailableMoves(pieceId: string): Position[] {
		const piece = this.pieces.find(piece => piece.id === pieceId);

		if (!piece) {
			throw new Error('PIECE_NOT_FOUND');
		}

		const moves = piece.getAvailableMoves(this);

		return moves;
	}
}
