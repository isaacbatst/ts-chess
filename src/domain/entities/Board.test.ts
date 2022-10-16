import {Board} from './Board';
import {PieceColor} from './Piece';
import {Pawn} from './Pieces/Pawn/Pawn';
import {Col, Position, Row} from './Position';

describe('Board', () => {
	describe('Given a piece moves to capture', () => {
		it('should capture', () => {
			const board = new Board();
			const whitePawn = new Pawn(
				'any-id',
				new Position(Row.TWO, Col.A),
				PieceColor.WHITE,
			);

			const blackPawn = new Pawn(
				'any-id-2',
				new Position(Row.THREE, Col.B),
				PieceColor.BLACK,
			);

			board.addPiece(whitePawn);
			board.addPiece(blackPawn);

			board.movePiece(whitePawn, new Position(Row.THREE, Col.B));

			expect(() => {
				board.getPieceOnboardById('any-id-2');
			}).toThrow('PIECE_NOT_FOUND');
		});
	});
});
