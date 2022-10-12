import type {PieceOnBoard} from './PieceOnboard';
import type {Position} from './Position';

export class Board {
	readonly pieces: PieceOnBoard[] = [];

	addPiece(pieceOnBoard: PieceOnBoard) {
		if (this.isPositionOccupied(pieceOnBoard.position)) {
			throw new Error('POSITION_OCCUPIED');
		}

		this.pieces.push(pieceOnBoard);
	}

	public isPositionOccupied(position: Position) {
		return this.pieces.some(piece => (
			piece.position.col === position.col && piece.position.row === position.row
		));
	}
}
