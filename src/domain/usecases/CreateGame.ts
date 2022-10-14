import crypto from 'node:crypto';
import {Board} from '../entities/Board';
import {BoardCreator} from '../entities/BoardCreator';
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
		const board = BoardCreator.create();
		const game = new Game(id, input.whitePlayerId, input.blackPlayerId, board);
		await this.createGameRepository.create(game);

		return {
			id,
		};
	}
}
