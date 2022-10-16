import {CreateGame} from './domain/usecases/CreateGame';
import {GetGameById} from './domain/usecases/GetGameById';
import {GetGameByPlayerId} from './domain/usecases/GetGameByPlayerId';
import {GetPieceAvailableMoves} from './domain/usecases/GetPieceAvailableMoves';
import {MovePiece} from './domain/usecases/MovePiece';
import {MemoryGameRepository} from './infra/persistance/memory/MemoryGameRepository';
import crypto from 'node:crypto';

const gameRepository = new MemoryGameRepository();
const createGame = new CreateGame(gameRepository);
const getPieceAvailableMoves = new GetPieceAvailableMoves(gameRepository);
const getGameById = new GetGameById(gameRepository);
const getGameByPlayerId = new GetGameByPlayerId(gameRepository);
const movePiece = new MovePiece(gameRepository);

const main = async (): Promise<void> => {
	const blackPlayerId = crypto.randomUUID();
	const whitePlayerId = crypto.randomUUID();

	const {id: gameId} = await createGame.execute({
		blackPlayerId,
		whitePlayerId,
	});

	const game = await getGameById.execute(gameId);

	const moves = await getPieceAvailableMoves.execute({
		gameId,
		pieceId: game.board.piecesOnBoard[0].id,
	});

	await movePiece.execute({
		gameId,
		pieceId: game.board.piecesOnBoard[0].id,
		to: moves[0],
	});

	console.log(game);
};

main()
	.catch(err => {
		console.error(err);
	});
