import crypto from 'node:crypto';
import {Board} from '../entities/Board';
import {Game} from '../entities/Game';
import {PieceColor} from '../entities/PieceOnboard';
import {Pawn} from '../entities/Pieces/Pawn';
import {Col, Position, Row} from '../entities/Position';
import type {CreateGameRepository} from '../repositories';

type Input = {
	whitePlayerId: string;
	blackPlayerId: string;
};

export class CreateGame {
	constructor(
		private readonly createGameRepository: CreateGameRepository,
	) {}

	async execute(input: Input) {
		const id = crypto.randomUUID();
		const board = this.createBoard();
		const game = new Game(id, input.whitePlayerId, input.blackPlayerId, board);
		await this.createGameRepository.create(game);

		return {
			id,
		};
	}

	private createBoard(): Board {
		const board = new Board();

		const pawn2aId = crypto.randomUUID();
		const pawn2A = new Pawn(pawn2aId, new Position(Row.TWO, Col.A), PieceColor.WHITE, false);
		board.addPiece(pawn2A);

		const pawn7aId = crypto.randomUUID();
		const pawn7A = new Pawn(pawn7aId, new Position(Row.SEVEN, Col.A), PieceColor.BLACK, false);
		board.addPiece(pawn7A);

		return board;
	}
}
