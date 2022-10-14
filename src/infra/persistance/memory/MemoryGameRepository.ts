import type {Board} from '../../../domain/entities/Board';
import type {Game} from '../../../domain/entities/Game';
import type {CreateGameRepository, GetGameByIdRepository} from '../../../domain/repositories';

export class MemoryGameRepository implements GetGameByIdRepository, CreateGameRepository {
	private readonly games: Game[] = [];

	async create(game: Game): Promise<void> {
		this.games.push(game);
	}

	async getById(id: string): Promise<{board: Board} | undefined> {
		return this.games.find(game => game.id === id);
	}
}
