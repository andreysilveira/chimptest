import Cell from "./Cell";

export default interface BoardProps {
  rows?: number;
  columns?: number;
  cells: Cell[];
  gap?: number;
  padding?: number;
  onCellPress?: (cell: Cell) => void;
}