import crypto from 'node:crypto';
import {Board} from './Board';
import {PieceColor} from './PieceOnboard';
import {Pawn} from './Pieces/Pawn';
import {Col, Position, Row} from './Position';

export class BoardCreator {
	static create() {
		const board = new Board();

		BoardCreator.createPawns(board);

		return board;
	}

	private static createPawns(board: Board) {
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.A), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.B), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.C), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.D), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.E), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.F), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.G), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.TWO, Col.H), PieceColor.WHITE);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.A), PieceColor.BLACK);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.B), PieceColor.BLACK);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.C), PieceColor.BLACK);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.D), PieceColor.BLACK);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.E), PieceColor.BLACK);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.F), PieceColor.BLACK);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.G), PieceColor.BLACK);
		BoardCreator.createPawn(board, new Position(Row.SEVEN, Col.H), PieceColor.BLACK);
	}

	private static createPawn(board: Board, position: Position, color: PieceColor) {
		const id = crypto.randomUUID();
		const pawn = new Pawn(id, position, color, false);
		board.addPiece(pawn);
	}
}
