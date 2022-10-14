import type {GetGameByIdRepository, UpdateBoardGameRepository} from '../repositories';

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
		private readonly gamesRepository: GetGameByIdRepository & UpdateBoardGameRepository,
	) {}

	async execute(input: Input) {
		const game = await this.gamesRepository.getById(input.gameId);

		if (!game) {
			throw new Error('GAME_NOT_FOUND');
		}

		game.board.movePiece(input.pieceId, input.to);

		await this.gamesRepository.updateBoard(game.board, input.gameId);
	}
}
