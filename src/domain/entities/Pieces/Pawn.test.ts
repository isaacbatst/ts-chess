import {Board} from '../Board';
import {BoardCreator} from '../BoardCreator';
import {PieceColor} from '../PieceOnboard';
import {Col, Position, Row} from '../Position';
import {Pawn} from './Pawn';

describe('Pawn', () => {
	describe('Pawn 2A', () => {
		describe('Given initial board', () => {
			it('should return avaliable moves', () => {
				const board = BoardCreator.create();
				const pawn = board.getPieceByPosition(new Position(Row.TWO, Col.A));

				if (!pawn) {
					throw new Error('PAWN_NOT_FOUND');
				}

				const avaliableMoves = pawn.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(2);
				expect(avaliableMoves[0].isEqualTo(new Position(Row.THREE, Col.A))).toBeTruthy();
				expect(avaliableMoves[1].isEqualTo(new Position(Row.FOUR, Col.A))).toBeTruthy();
			});
		});

		describe('Given pawn has already moved', () => {
			it('should allow only one move', () => {
				const board = BoardCreator.create();
				const pawn = board.getPieceByPosition(new Position(Row.TWO, Col.A));

				if (!pawn) {
					throw new Error('PAWN_NOT_FOUND');
				}

				pawn.move(board, {row: Row.THREE, col: Col.A});

				const avaliableMoves = pawn.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(1);
				expect(avaliableMoves[0].isEqualTo(new Position(Row.FOUR, Col.A))).toBeTruthy();
			});
		});

		describe('Given enemy right diagonal', () => {
			it('should allow move foward and capturing', () => {
				const board = BoardCreator.create();
				const pawn2a = board.getPieceByPosition(new Position(Row.TWO, Col.A));
				const pawn7b = board.getPieceByPosition(new Position(Row.SEVEN, Col.B));

				if (!pawn2a || !pawn7b) {
					throw new Error('PAWN_NOT_FOUND');
				}

				pawn7b.move(board, {row: Row.FIVE, col: Col.B});
				pawn2a.move(board, {row: Row.THREE, col: Col.A});
				pawn7b.move(board, {row: Row.FOUR, col: Col.B});

				const avaliableMoves = pawn2a.getAvailableMoves(board);

				expect(avaliableMoves).toHaveLength(2);
				expect(avaliableMoves[0].isEqualTo(new Position(Row.FOUR, Col.A))).toBeTruthy();
				expect(avaliableMoves[1].isEqualTo(new Position(Row.FOUR, Col.B))).toBeTruthy();
			});
		});
	});

	describe('Pawn 2B', () => {
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

				console.log(avaliableMoves);

				expect(avaliableMoves).toHaveLength(3);
				expect(avaliableMoves[0].isEqualTo(new Position(Row.FIVE, Col.B))).toBeTruthy();
				expect(avaliableMoves[1].isEqualTo(new Position(Row.FIVE, Col.C))).toBeTruthy();
				expect(avaliableMoves[2].isEqualTo(new Position(Row.FIVE, Col.A))).toBeTruthy();
			});
		});
	});
});
