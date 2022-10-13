import type {Board} from '../../../domain/entities/Board';
import type {GetGameByIdRepository} from '../../../domain/repositories';
import crypto from 'node:crypto';

export class MemoryGameRepository implements GetGameByIdRepository {
	private readonly games: Array<{id: string; board: Board}> = [];

	async createGame(board: Board): Promise<{id: string}> {
		const id = crypto.randomUUID();
		this.games.push({
			id,
			board,
		});
		return {id};
	}

	async getById(id: string): Promise<{board: Board} | undefined> {
		return this.games.find(game => game.id === id);
	}
}
