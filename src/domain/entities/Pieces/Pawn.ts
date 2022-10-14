import type {Board} from '../Board';
import {PieceColor, PieceOnBoard} from '../PieceOnboard';
import type {Position} from '../Position';
import PawnBlackMoveCalculator from './PawnBlackMoveCalculator';
import {WhitesPawnMovesCalculator} from './PawnWhiteMoveCalculator';

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
		if (this.color === PieceColor.WHITE) {
			const whiteMovesCalculator = new WhitesPawnMovesCalculator(this, board);
			return whiteMovesCalculator.getMoves();
		}

		const blackMovesCalculator = new PawnBlackMoveCalculator(this, board);
		return blackMovesCalculator.getMoves();
	}

	getAllowedMovesForward() {
		return this.hasAlreadyMoved ? 1 : 2;
	}
}
