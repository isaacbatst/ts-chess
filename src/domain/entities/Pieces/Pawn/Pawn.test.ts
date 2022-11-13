import {Board} from '../../Board';
import {PieceColor} from '../../Piece';
import {Col, Position, Row} from '../../Position';
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
				pawn.move(board, new Position(Row.THREE, Col.A));
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

		describe('Given next row is occupied', () => {
			it('should not allow move foward', () => {
				const board = new Board();
				const pawn2b = new Pawn('any-id-1', new Position(Row.TWO, Col.B), PieceColor.WHITE);
				const pawn7b = new Pawn('any-id-2', new Position(Row.THREE, Col.B), PieceColor.BLACK);
				board.addPiece(pawn2b);
				board.addPiece(pawn7b);

				const avaliableMoves = pawn2b.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(0);
			});
		});

		describe('Given a pawn at H column', () => {
			it('should allow move foward and left diagonal', () => {
				const board = new Board();
				const pawn2g = new Pawn('any-id-1', new Position(Row.TWO, Col.G), PieceColor.WHITE);
				const pawn3h = new Pawn('any-id-2', new Position(Row.THREE, Col.H), PieceColor.BLACK, true);
				board.addPiece(pawn2g);
				board.addPiece(pawn3h);

				const avaliableMoves = pawn3h.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(2);
				expect(avaliableMoves).toContainEqual(new Position(Row.TWO, Col.G));
				expect(avaliableMoves).toContainEqual(new Position(Row.TWO, Col.H));
			});
		});
	});

	describe('Blacks', () => {
		describe('Given pawn has not moved yet', () => {
			it('should return initial avaliable moves', () => {
				const board = new Board();
				const pawn = new Pawn('any-id', new Position(Row.SEVEN, Col.A), PieceColor.BLACK);
				board.addPiece(pawn);
				const avaliableMoves = pawn.getAvailableMoves(board);
				expect(avaliableMoves).toHaveLength(2);
				expect(avaliableMoves).toContainEqual(new Position(Row.SIX, Col.A));
				expect(avaliableMoves).toContainEqual(new Position(Row.FIVE, Col.A));
			});
		});

		describe('Given pawn has already moved', () => {
			it('should allow only one move', () => {
				const board = new Board();
				const pawn = new Pawn('any-id', new Position(Row.SEVEN, Col.A), PieceColor.BLACK);
				board.addPiece(pawn);
				pawn.move(board, new Position(Row.SIX, Col.A));
				const avaliableMoves = pawn.getAvailableMoves(board);
				expect(avaliableMoves).toHaveLength(1);
				expect(avaliableMoves).toContainEqual(new Position(Row.FIVE, Col.A));
			});
		});

		describe('Given enemy right diagonal', () => {
			it('should allow move foward and capturing', () => {
				const board = new Board();
				const pawn2a = new Pawn('any-id-1', new Position(Row.SEVEN, Col.A), PieceColor.BLACK);
				const pawn7b = new Pawn('any-id-2', new Position(Row.SIX, Col.B), PieceColor.WHITE);
				board.addPiece(pawn2a);
				board.addPiece(pawn7b);
				const avaliableMoves = pawn2a.getAvailableMoves(board);
				expect(avaliableMoves).toHaveLength(3);

				expect(avaliableMoves).toContainEqual(new Position(Row.SIX, Col.A));
				expect(avaliableMoves).toContainEqual(new Position(Row.FIVE, Col.A));
				expect(avaliableMoves).toContainEqual(new Position(Row.SIX, Col.B));
			});
		});

		describe('Given enemies at both diagonals', () => {
			it('should allow move foward and capturing', () => {
				const board = new Board();
				const pawn2b = new Pawn('any-id-1', new Position(Row.FIVE, Col.B), PieceColor.BLACK, true);
				const pawn7a = new Pawn('any-id-2', new Position(Row.FOUR, Col.A), PieceColor.WHITE);
				const pawn7c = new Pawn('any-id-3', new Position(Row.FOUR, Col.C), PieceColor.WHITE);

				board.addPiece(pawn2b);
				board.addPiece(pawn7a);
				board.addPiece(pawn7c);

				const avaliableMoves = pawn2b.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(3);
				expect(avaliableMoves).toContainEqual(new Position(Row.FOUR, Col.B));
				expect(avaliableMoves).toContainEqual(new Position(Row.FOUR, Col.C));
				expect(avaliableMoves).toContainEqual(new Position(Row.FOUR, Col.A));
			});
		});

		describe('Given next row is occupied', () => {
			it('should not allow move foward', () => {
				const board = new Board();
				const pawn2b = new Pawn('any-id-1', new Position(Row.TWO, Col.B), PieceColor.WHITE);
				const pawn7b = new Pawn('any-id-2', new Position(Row.THREE, Col.B), PieceColor.BLACK);
				board.addPiece(pawn2b);
				board.addPiece(pawn7b);

				const avaliableMoves = pawn7b.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(0);
			});
		});
	});
});
