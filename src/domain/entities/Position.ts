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
	readonly row: Row;
	readonly col: Col;

	constructor(
		row: string,
		col: string,
	) {
		if (!this.isRowValid(row)) {
			throw new Error('INVALID_ROW');
		}

		if (!this.isColValid(col)) {
			throw new Error('INVALID_COL');
		}

		this.row = row;
		this.col = col;
	}

	public isEqualTo(position: Position) {
		return position.col === this.col && position.row === this.row;
	}

	private isRowValid(row: string): row is Row {
		return row in Row;
	}

	private isColValid(col: string): col is Col {
		return col in Col;
	}
}
