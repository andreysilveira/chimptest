import React, { useMemo, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import Circle from "../atoms/Circle";
import Cell from "@/types/Board/Cell";

interface GameBoardProps {
  cells: Cell[];
  gameState: "idle" | "memorizing" | "playing" | "wrong" | "game_over";
  tappedCellIds: string[];
  wrongCellId: string | null;
  onCellPress: (cell: Cell) => void;
  gap?: number;
}

const GRID_COLS = 5;
const GRID_ROWS = 8;

export default function GameBoard({
  cells,
  gameState,
  tappedCellIds,
  wrongCellId,
  onCellPress,
  gap = 8, // Restore original gap size
}: GameBoardProps) {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout((prev) => {
      if (prev.width === width && prev.height === height) return prev;
      return { width, height };
    });
  };

  const { cellSize, columns, rows } = useMemo(() => {
    if (!layout.width || !layout.height) {
      return { cellSize: 0, columns: GRID_COLS, rows: GRID_ROWS };
    }

    const widthSize = (layout.width - gap * (GRID_COLS - 1)) / GRID_COLS;
    const heightSize = (layout.height - gap * (GRID_ROWS - 1)) / GRID_ROWS;
    const size = Math.floor(Math.min(widthSize, heightSize));

    return {
      cellSize: size,
      columns: GRID_COLS,
      rows: GRID_ROWS,
    };
  }, [layout.width, layout.height, gap]);

  // Group flat array of cells into 2D matrix of rows
  const matrix = useMemo(() => {
    const rowsArray: Cell[][] = [];
    for (let r = 0; r < rows; r++) {
      rowsArray.push(cells.slice(r * columns, r * columns + columns));
    }
    return rowsArray;
  }, [cells, rows, columns]);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {cellSize > 0 && (
        <View style={[styles.grid, { rowGap: gap }]}>
          {matrix.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.row, { columnGap: gap }]}>
              {row.map((cell) => {
                const isTarget = cell.value !== undefined;

                return (
                  <View
                    key={cell.id}
                    style={{
                      width: cellSize,
                      height: cellSize,
                    }}
                  >
                    {isTarget ? (
                      <Circle
                        value={cell.value}
                        isTapped={tappedCellIds.includes(cell.id)}
                        gameState={gameState}
                        isWrong={wrongCellId === cell.id}
                        onPress={() => onCellPress(cell)}
                        size={cellSize}
                      />
                    ) : (
                      // Render as the original grey inactive cells in the board grid
                      <View
                        style={[
                          styles.inactiveCell,
                          { width: cellSize, height: cellSize },
                        ]}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  inactiveCell: {
    backgroundColor: "#E5E5E5", // Original grey color
    borderRadius: 8, // Original rounded corners
  },
});
