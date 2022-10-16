export enum PieceStatus {
	ONBOARD = 'ONBOARD',
	CAPTURED = 'CAPTURED',
}

export enum PieceColor {
	WHITE = 'WHITE',
	BLACK = 'BLACK',
}

export abstract class Piece {
	constructor(
		readonly id: string,
		readonly status: PieceStatus,
		readonly color: PieceColor,
	) {}
}
