import Cell from "./Cell";

export default interface BoardProps {
  cells: Cell[];
  columns?: number;
  gap?: number;
  padding?: number;
  onCellPress?: (cell: Cell) => void;
}