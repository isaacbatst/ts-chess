import type {Board} from './Board';

export class Game {
	constructor(
		readonly id: string,
		readonly whitePlayerId: string,
		readonly blackPlayerId: string,
		public board: Board,
	) {}
}
