import {Board} from './domain/entities/Board';
import {PieceColor} from './domain/entities/PieceOnboard';
import {Pawn} from './domain/entities/Pieces/Pawn';
import {Col, Position, Row} from './domain/entities/Position';
import crypto from 'node:crypto';
import {MemoryGameRepository} from './infra/persistance/memory/MemoryGameRepository';
import {GetPieceAvailableMoves} from './domain/usecases/GetPieceAvailableMoves';

const board = new Board();

const pawn2aId = crypto.randomUUID();
const pawn2A = new Pawn(pawn2aId, new Position(Row.TWO, Col.A), PieceColor.WHITE, false);
board.addPiece(pawn2A);

const pawn7aId = crypto.randomUUID();
const pawn7A = new Pawn(pawn7aId, new Position(Row.SEVEN, Col.A), PieceColor.BLACK, false);
board.addPiece(pawn7A);

const gameRepository = new MemoryGameRepository();

const getPieceAvailableMoves = new GetPieceAvailableMoves(gameRepository);

const main = async (): Promise<void> => {
	const {id: gameId} = await gameRepository.createGame(board);
	await getPieceAvailableMoves.execute({
		gameId,
		pieceId: pawn2aId,
	});
};

main()
	.catch(err => {
		console.error(err);
	});
