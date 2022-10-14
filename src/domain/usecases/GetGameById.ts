import type {GetGameByIdRepository} from '../repositories';

export class GetGameById {
	constructor(
		private readonly gameRepository: GetGameByIdRepository,
	) {}

	async execute(id: string) {
		const game = await this.gameRepository.getById(id);

		if (!game) {
			throw new Error('GAME_NOT_FOUND');
		}

		return game;
	}
}
