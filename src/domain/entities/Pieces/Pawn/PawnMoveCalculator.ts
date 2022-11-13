import type {Board} from '../../Board';
import type {Position} from '../../Position';
import {Col} from '../../Position';
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

	protected getCaptureMoves(): Position[] {
		const moves: Position[] = [];
		const position = this.pawn.getPosition();

		if (position.col === Col.A) {
			return this.getPossibleCapturesForColA();
		}

		if (position.col === Col.H) {
			return this.getPossibleCapturesForColH();
		}

		if (this.isRightDiagonalPossible()) {
			moves.push(this.getRightDiagonal());
		}

		if (this.isLeftDiagonalPossible()) {
			moves.push(this.getLeftDiagonal());
		}

		return moves;
	}

	protected abstract getLeftDiagonal(): Position;
	protected abstract getRightDiagonal(): Position;

	private isRightDiagonalPossible() {
		const rightDiagonal = this.getRightDiagonal();

		return this.board.isPositionOccupiedByEnemy(rightDiagonal, this.pawn.color);
	}

	private isLeftDiagonalPossible() {
		const leftDiagonal = this.getLeftDiagonal();

		return this.board.isPositionOccupiedByEnemy(leftDiagonal, this.pawn.color);
	}

	private getPossibleCapturesForColA(): Position[] {
		const moves: Position[] = [];

		if (this.isRightDiagonalPossible()) {
			moves.push(this.getRightDiagonal());
		}

		return moves;
	}

	private getPossibleCapturesForColH(): Position[] {
		const leftDiagonal = this.getLeftDiagonal();
		return [leftDiagonal];
	}
}
