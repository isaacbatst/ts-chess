import type {Board} from '../Board';
import type {Position} from '../Position';
import {Col} from '../Position';
import type {Pawn} from './Pawn';

export abstract class PawnMovesCalculator {
	protected readonly rowIndex: number;
	protected readonly colIndex: number;

	constructor(
		protected readonly pawn: Pawn,
		protected readonly board: Board,
	) {
		this.rowIndex = pawn.getRowIndex();
		this.colIndex = pawn.getColIndex();
	}

	public abstract getMoves(): Position[];

	protected checkAndPushLeftDiagonal(moves: Position[]) {
		const leftDiagonal = this.getLeftDiagonal();
		if (this.board.isPositionOccupiedByEnemy(leftDiagonal, this.pawn.color)) {
			moves.push(leftDiagonal);
		}
	}

	protected checkAndPushRightDiagonal(moves: Position[]) {
		const rightDiagonal = this.getRightDiagonal();
		if (this.board.isPositionOccupiedByEnemy(rightDiagonal, this.pawn.color)) {
			moves.push(rightDiagonal);
		}
	}

	protected getCaptureMoves(): Position[] {
		const moves: Position[] = [];
		const position = this.pawn.getPosition();

		if (position.col === Col.A) {
			this.checkAndPushRightDiagonal(moves);
			return moves;
		}

		if (position.col === Col.H) {
			this.checkAndPushLeftDiagonal(moves);
			return moves;
		}

		this.checkAndPushRightDiagonal(moves);
		this.checkAndPushLeftDiagonal(moves);

		return moves;
	}

	protected abstract getLeftDiagonal(): Position;
	protected abstract getRightDiagonal(): Position;
}
