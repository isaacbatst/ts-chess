import type {Board} from './entities/Board';
import type {Game} from './entities/Game';

export type MovePieceBoardRepository = {
	move(newBoard: Board, gameId: string): Promise<void>;
};

export type GetGameByIdRepository = {
	getById(id: string): Promise<{board: Board} | undefined>;
};

export type CreateGameRepository = {
	create(game: Game): Promise<void>;
};
