import type {GetGameByPlayerIdRepository} from '../repositories';

export class GetGameByPlayerId {
	constructor(
		private readonly gameRepository: GetGameByPlayerIdRepository,
	) {}

	async execute(playerId: string) {
		const game = await this.gameRepository.getByPlayerId(playerId);

		if (!game) {
			throw new Error('GAME_NOT_FOUND');
		}

		return game;
	}
}
