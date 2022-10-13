import type {Board} from './entities/Board';

export type MovePieceBoardRepository = {
	move(newBoard: Board, gameId: string): Promise<void>;
};

export type GetGameByIdRepository = {
	getById(id: string): Promise<{board: Board} | undefined>;
};
