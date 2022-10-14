import {Board} from '../Board';
import {PieceColor} from '../PieceOnboard';
import {Col, Position, Row} from '../Position';
import {Pawn} from './Pawn';

describe('Pawn', () => {
	describe('Whites', () => {
		describe('Given pawn has not moved yet', () => {
			it('should return initial avaliable moves', () => {
				const board = new Board();
				const pawn = new Pawn('any-id', new Position(Row.TWO, Col.A), PieceColor.WHITE);
				board.addPiece(pawn);
				const avaliableMoves = pawn.getAvailableMoves(board);
				expect(avaliableMoves).toHaveLength(2);
				expect(avaliableMoves).toContainEqual(new Position(Row.THREE, Col.A));
				expect(avaliableMoves).toContainEqual(new Position(Row.FOUR, Col.A));
			});
		});

		describe('Given pawn has already moved', () => {
			it('should allow only one move', () => {
				const board = new Board();
				const pawn = new Pawn('any-id', new Position(Row.TWO, Col.A), PieceColor.WHITE);
				board.addPiece(pawn);
				pawn.move(board, {row: Row.THREE, col: Col.A});
				const avaliableMoves = pawn.getAvailableMoves(board);
				expect(avaliableMoves).toHaveLength(1);
				expect(avaliableMoves).toContainEqual(new Position(Row.FOUR, Col.A));
			});
		});

		describe('Given enemy right diagonal', () => {
			it('should allow move foward and capturing', () => {
				const board = new Board();
				const pawn2a = new Pawn('any-id-1', new Position(Row.TWO, Col.A), PieceColor.WHITE);
				const pawn7b = new Pawn('any-id-2', new Position(Row.THREE, Col.B), PieceColor.BLACK);
				board.addPiece(pawn2a);
				board.addPiece(pawn7b);
				const avaliableMoves = pawn2a.getAvailableMoves(board);
				expect(avaliableMoves).toHaveLength(3);

				expect(avaliableMoves).toContainEqual(new Position(Row.FOUR, Col.A));
				expect(avaliableMoves).toContainEqual(new Position(Row.THREE, Col.A));
				expect(avaliableMoves).toContainEqual(new Position(Row.THREE, Col.B));
			});
		});

		describe('Given enemies at both diagonals', () => {
			it('should allow move foward and capturing', () => {
				const board = new Board();
				const pawn2b = new Pawn('any-id-1', new Position(Row.FOUR, Col.B), PieceColor.WHITE, true);
				const pawn7a = new Pawn('any-id-2', new Position(Row.FIVE, Col.A), PieceColor.BLACK);
				const pawn7c = new Pawn('any-id-3', new Position(Row.FIVE, Col.C), PieceColor.BLACK);

				board.addPiece(pawn2b);
				board.addPiece(pawn7a);
				board.addPiece(pawn7c);

				const avaliableMoves = pawn2b.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(3);
				expect(avaliableMoves).toContainEqual(new Position(Row.FIVE, Col.B));
				expect(avaliableMoves).toContainEqual(new Position(Row.FIVE, Col.C));
				expect(avaliableMoves).toContainEqual(new Position(Row.FIVE, Col.A));
			});
		});
	});
});
