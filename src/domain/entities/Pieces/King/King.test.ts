import {Board} from '../../Board';
import {PieceColor} from '../../Piece';
import {Col, Position, Row} from '../../Position';
import {King} from './King';

describe('King', () => {
	describe('Whites', () => {
		describe('Given it is at board center', () => {
			it('should allow move foward', () => {
				const board = new Board();
				const king = new King('any-id', new Position(Row.FIVE, Col.E), PieceColor.WHITE);
				board.addPiece(king);

				const avaliableMoves = king.getAvailableMoves(board);

				expect(avaliableMoves).toContainEqual(new Position(Row.SIX, Col.E));
			});

			it('should allow move backward', () => {
				const board = new Board();
				const king = new King('any-id', new Position(Row.FIVE, Col.E), PieceColor.WHITE);
				board.addPiece(king);

				const avaliableMoves = king.getAvailableMoves(board);
				expect(avaliableMoves).toContainEqual(new Position(Row.FOUR, Col.E));
			});

			it('should allow move to left', () => {
				const board = new Board();
				const king = new King('any-id', new Position(Row.FIVE, Col.E), PieceColor.WHITE);
				board.addPiece(king);

				const avaliableMoves = king.getAvailableMoves(board);
				expect(avaliableMoves).toContainEqual(new Position(Row.FIVE, Col.D));
			});
		});
	});
});
