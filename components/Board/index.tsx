import React, { useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";

import { styles } from "./styles";
import BoardProps from "@/types/Board/BoardProps";

export default function Board({ cells, gap = 8, onCellPress }: BoardProps) {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;

    setLayout((previous) => {
      if (previous.width === width && previous.height === height) {
        return previous;
      }

      return { width, height };
    });
  }

  const { columns, rows, cellSize } = useMemo(() => {
    if (!layout.width || !layout.height) {
      return {
        columns: 1,
        rows: cells.length,
        cellSize: 0,
      };
    }

    let bestColumns = 1;
    let bestRows = cells.length;
    let bestCellSize = 0;

    // Testa todas as possibilidades e escolhe a que gera
    // a maior célula possível.
    for (let cols = 1; cols <= cells.length; cols++) {
      const rows = Math.ceil(cells.length / cols);

      const widthSize = (layout.width - gap * (cols - 1)) / cols;

      const heightSize = (layout.height - gap * (rows - 1)) / rows;

      const size = Math.floor(Math.min(widthSize, heightSize));

      if (size > bestCellSize) {
        bestCellSize = size;
        bestColumns = cols;
        bestRows = rows;
      }
    }

    return {
      columns: bestColumns,
      rows: bestRows,
      cellSize: bestCellSize,
    };
  }, [cells.length, layout.width, layout.height, gap]);

  const matrix = useMemo(() => {
    return Array.from({ length: rows }, (_, row) =>
      cells.slice(row * columns, row * columns + columns),
    );
  }, [cells, rows, columns]);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View
        style={[
          styles.grid,
          {
            rowGap: gap,
          },
        ]}
      >
        {matrix.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={[
              styles.row,
              {
                columnGap: gap,
              },
            ]}
          >
            {row.map((cell) => (
              <Pressable
                key={cell.id}
                disabled={cell.disabled}
                onPress={() => onCellPress?.(cell)}
                style={[
                  styles.cell,
                  cell.visible && styles.activeCell,
                  {
                    width: cellSize,
                    height: cellSize,
                  },
                ]}
              >
                {cell.visible && <Text style={styles.text}>{cell.value}</Text>}
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
