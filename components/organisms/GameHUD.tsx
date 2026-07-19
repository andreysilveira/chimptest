import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface GameHUDProps {
  gameState: "idle" | "memorizing" | "playing" | "wrong" | "game_over";
  expectedValue: number;
  totalNumbers: number;
}

export default function GameHUD({
  gameState,
  expectedValue,
  totalNumbers,
}: GameHUDProps) {
  const isMemorizing = gameState === "memorizing";

  return (
    <View style={styles.container}>
      {isMemorizing ? (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>Prepare-se!</Text>
          <Text style={styles.subInstructionText}>
            Observe os números e toque no <Text style={styles.numberHighlight}>1</Text> para começar.
          </Text>
        </View>
      ) : (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Encontre o número <Text style={styles.numberHighlight}>{expectedValue}</Text> de{" "}
            {totalNumbers}
          </Text>
          <Text style={styles.subInstructionText}>
            Selecione na ordem crescente (1 → 2 → 3...)
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#121629",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2d3561",
  },
  instructionContainer: {
    alignItems: "center",
  },
  instructionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  numberHighlight: {
    color: "#6366f1", // Indigo 500
    fontWeight: "800",
  },
  subInstructionText: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
});
