import type {Col, Row} from '../entities/Position';
import type {GetGameByIdRepository} from '../repositories';

type Input = {
	gameId: string;
	pieceId: string;
};

type Output = {
	row: Row;
	col: Col;
};

export class GetPieceAvailableMoves {
	constructor(
		private readonly gamesRepository: GetGameByIdRepository,
	) {}

	async execute(input: Input): Promise<Output[]> {
		const game = await this.gamesRepository.getById(input.gameId);

		if (!game) {
			throw new Error('GAME_NOT_FOUND');
		}

		const moves = game.board.getPieceAvailableMoves(input.pieceId);

		return moves;
	}
}
