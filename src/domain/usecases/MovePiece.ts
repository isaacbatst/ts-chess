import type {GetGameByIdRepository, MovePieceBoardRepository} from '../repositories';

type Input = {
	to: {
		row: string;
		col: string;
	};
	pieceId: string;
	gameId: string;
};

export class MovePiece {
	constructor(
		private readonly gamesRepository: GetGameByIdRepository,
		private readonly pieceRepository: MovePieceBoardRepository,
	) {}

	async execute(input: Input) {
		const game = await this.gamesRepository.getById(input.gameId);

		if (!game) {
			throw new Error('GAME_NOT_FOUND');
		}

		game.board.movePiece(input.pieceId, input.to);

		await this.pieceRepository.move(game.board, input.gameId);
	}
}
