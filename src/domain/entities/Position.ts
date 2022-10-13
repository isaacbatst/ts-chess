export enum Row {
	ONE = 'ONE',
	TWO = 'TWO',
	THREE = 'THREE',
	FOUR = 'FOUR',
	FIVE = 'FIVE',
	SIX = 'SIX',
	SEVEN = 'SEVEN',
	EIGHT = 'EIGHT',
}

export enum Col {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	E = 'E',
	F = 'F',
	G = 'G',
	H = 'H',
}

export class Position {
	constructor(
		readonly row: Row,
		readonly col: Col,
	) {}
}
