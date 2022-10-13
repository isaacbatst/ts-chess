import {Board} from './domain/entities/Board';
import {PieceColor} from './domain/entities/PieceOnboard';
import {Pawn} from './domain/entities/Pieces/Pawn';
import {Col, Position, Row} from './domain/entities/Position';

const board = new Board();

const pawn2A = new Pawn(new Position(Row.TWO, Col.A), PieceColor.WHITE);
board.addPiece(pawn2A);

