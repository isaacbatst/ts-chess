import {Board} from '../Board';
import {Position, Row} from '../Position';
import {PawnMovesCalculator} from './PawnMoveCalculator';

export class WhitesPawnMovesCalculator extends PawnMovesCalculator {
	private static readonly lastRowIndex = Board.rows.length - 1;

	public getMoves(): Position[] {
		const availableMoves: Position[] = [];

		for (let index = this.rowIndex; this.isPossibleMove(index); index += 1) {
			const nextRow = Board.rows[index + 1];
			const newPosition = new Position(Row[nextRow], this.pawn.getPosition().col);
			if (this.board.isPositionOccupied(newPosition)) {
				break;
			}

			availableMoves.push(newPosition);
		}

		if (this.pawn.getPosition().row === Row.EIGHT) {
			return availableMoves;
		}

		const captureMoves = this.getCaptureMoves();

		availableMoves.push(...captureMoves);

		return availableMoves;
	}

	protected getLeftDiagonal() {
		const leftDiagonalRow = this.rowIndex + 1;
		const leftDiagonalCol = this.colIndex - 1;
		return new Position(Board.rows[leftDiagonalRow], Board.cols[leftDiagonalCol]);
	}

	protected getRightDiagonal() {
		const rightDiagonalRow = this.rowIndex + 1;
		const rightDiagonalCol = this.colIndex + 1;
		return new Position(Board.rows[rightDiagonalRow], Board.cols[rightDiagonalCol]);
	}

	private isPossibleMove(index: number) {
		return index <= WhitesPawnMovesCalculator.lastRowIndex
    && index < this.rowIndex + this.pawn.getAllowedMovesForward();
	}
}
