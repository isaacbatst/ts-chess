import type {PieceColor} from './Piece';
import {PieceStatus} from './Piece';
import {Piece} from './Piece';

export class PieceCaptured extends Piece {
	constructor(
		id: string,
		color: PieceColor,
	) {
		super(id, PieceStatus.CAPTURED, color);
	}
}
