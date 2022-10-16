import {Position} from '../entities/Position';
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

		const piece = game.board.getPieceOnboardById(input.pieceId);
		game.board.movePiece(piece, new Position(input.to.row, input.to.col));

		await this.gamesRepository.updateBoard(game.board, input.gameId);
	}
}
