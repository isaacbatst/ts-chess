import type {Board} from '../entities/Board';
import type {PieceOnBoard} from '../entities/PieceOnboard';
import type {Col, Position, Row} from '../entities/Position';

type Game = {
	board: Board;
};

type Input = {
	gameId: string;
	pieceId: string;
};

type Output = {
	row: Row;
	col: Col;
};

type PiecesRepository = {
	getById(id: string): Promise<PieceOnBoard | undefined>;
};

type GamesRepository = {
	getById(id: string): Promise<Game | undefined>;
};

export class GetPieceAvailableMoves {
	constructor(
		private readonly piecesRepository: PiecesRepository,
		private readonly gamesRepository: GamesRepository,
	) {}

	async execute(input: Input): Promise<Output[]> {
		const piece = await this.piecesRepository.getById(input.pieceId);

		if (!piece) {
			throw new Error('PIECE_NOT_FOUND');
		}

		const game = await this.gamesRepository.getById(input.gameId);

		if (!game) {
			throw new Error('GAME_NOT_FOUND');
		}

		const moves = piece.getAvailableMoves(game.board);

		return moves;
	}
}
