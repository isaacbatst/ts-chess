import type {Board} from './Board';
import type {Position} from './Position';

export enum PieceColor {
	WHITE = 'WHITE',
	BLACK = 'BLACK',
}

export type PieceOnBoard = {
	color: PieceColor;
	position: Position;
	getAvailableMoves(board: Board): Position[];
};
