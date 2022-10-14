import type {Board} from '../../../domain/entities/Board';
import type {Game} from '../../../domain/entities/Game';
import type {CreateGameRepository, GetGameByIdRepository, GetGameByPlayerIdRepository, UpdateBoardGameRepository} from '../../../domain/repositories';

export class MemoryGameRepository
implements
		GetGameByIdRepository,
		CreateGameRepository,
		GetGameByPlayerIdRepository,
		UpdateBoardGameRepository {
	private readonly games: Game[] = [];

	async create(game: Game): Promise<void> {
		this.games.push(game);
	}

	async getById(id: string): Promise<{board: Board} | undefined> {
		return this.games.find(game => game.id === id);
	}

	async getByPlayerId(playerId: string) {
		return this.games.find(game => (
			game.blackPlayerId === playerId || game.whitePlayerId === playerId
		));
	}

	async updateBoard(newBoard: Board, gameId: string): Promise<void> {
		const game = this.games.find(game => game.id === gameId);

		if (!game) {
			throw new Error('GAME_NOT_FOUND');
		}

		game.board = newBoard;
	}
}
