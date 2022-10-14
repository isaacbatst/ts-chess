import {CreateGame} from './domain/usecases/CreateGame';
import {GetPieceAvailableMoves} from './domain/usecases/GetPieceAvailableMoves';
import {MemoryGameRepository} from './infra/persistance/memory/MemoryGameRepository';

const gameRepository = new MemoryGameRepository();
const createGame = new CreateGame(gameRepository);
const getPieceAvailableMoves = new GetPieceAvailableMoves(gameRepository);

const main = async (): Promise<void> => {
	const blackPlayerId = crypto.randomUUID();
	const whitePlayerId = crypto.randomUUID();

	const {id: gameId} = await createGame.execute({
		blackPlayerId,
		whitePlayerId,
	});
};

main()
	.catch(err => {
		console.error(err);
	});
