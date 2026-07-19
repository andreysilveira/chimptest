import React, { useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";

import { styles } from "./styles";
import BoardProps from "@/types/Board/BoardProps";

export default function Board({
  cells,
  columns = 8,
  gap = 8,
  onCellPress,
}: BoardProps) {
  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  const rows = Math.ceil(cells.length / columns);

  const cellSize = useMemo(() => {
    if (!boardSize.width || !boardSize.height) return 0;

    const availableWidth = boardSize.width - gap * (columns - 1);

    const availableHeight = boardSize.height - gap * (rows - 1);

    return Math.floor(
      Math.min(availableWidth / columns, availableHeight / rows),
    );
  }, [boardSize, columns, rows, gap]);

  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;

    setBoardSize((previous) => {
      if (previous.width === width && previous.height === height) {
        return previous;
      }

      return { width, height };
    });
  }

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={[styles.board, { gap }]}>
        {cells.map((cell) => (
          <Pressable
            key={cell.id}
            disabled={cell.disabled}
            onPress={() => onCellPress?.(cell)}
            style={[
              styles.cell,
              cell.visible && styles.activeCell,
              {
                width: cellSize,
                aspectRatio: 1,
              },
            ]}
          >
            {cell.visible && <Text style={styles.text}>{cell.value}</Text>}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
