import type {PieceColor} from './Piece';
import {Piece} from './Piece';
import {PieceCaptured} from './PieceCaptured';
import type {PieceOnBoard} from './PieceOnboard';
import type {Position} from './Position';
import {Col, Row} from './Position';

export type MovingBoard = {
	movePiece(pieceId: string, to: {row: string; col: string}): void;
};

export class Board {
	static readonly rows = Object.keys(Row) as Row[];
	static readonly cols = Object.keys(Col) as Col[];
	readonly piecesOnBoard: PieceOnBoard[] = [];
	readonly piecesCaptured: PieceCaptured[] = [];

	public addPiece(pieceOnBoard: PieceOnBoard) {
		if (this.isPositionOccupied(pieceOnBoard.getPosition())) {
			throw new Error('POSITION_OCCUPIED');
		}

		this.piecesOnBoard.push(pieceOnBoard);
	}

	public isPositionOccupied(position: Position) {
		return this.piecesOnBoard.some(piece => {
			const piecePosition = piece.getPosition();

			return piecePosition.isEqualTo(position);
		});
	}

	public isPositionOccupiedByEnemy(position: Position, color: PieceColor) {
		return this.piecesOnBoard.some(piece => {
			const piecePosition = piece.getPosition();

			return piecePosition.isEqualTo(position) && piece.color !== color;
		});
	}

	public getPieceOnboardById(pieceId: string): PieceOnBoard {
		const piece = this.piecesOnBoard.find(piece => piece.id === pieceId);

		if (!piece) {
			throw new Error('PIECE_NOT_FOUND');
		}

		return piece;
	}

	public movePiece(piece: PieceOnBoard, to: Position): void {
		const pieceOnPosition = this.getPieceByPosition(to);

		piece.move(this, to);

		if (pieceOnPosition) {
			this.capturePiece(pieceOnPosition);
		}
	}

	public getPieceAvailableMoves(piece: PieceOnBoard): Position[] {
		const moves = piece.getAvailableMoves(this);

		return moves;
	}

	private capturePiece(piece: PieceOnBoard) {
		const index = this.piecesOnBoard.findIndex(iteratedPiece => iteratedPiece.id === piece.id);

		if (!index) {
			throw new Error('PIECE_NOT_FOUND');
		}

		const captured = new PieceCaptured(piece.id, piece.color);

		this.piecesOnBoard.splice(index, 1);
		this.piecesCaptured.push(captured);
	}

	private getPieceByPosition(position: Position) {
		const piece = this.piecesOnBoard.find(piece => {
			const piecePosition = piece.getPosition();

			return piecePosition.isEqualTo(position);
		});

		return piece;
	}
}
