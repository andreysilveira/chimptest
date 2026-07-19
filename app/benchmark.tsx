import Board from "@/components/Board";
import Scoreboard from "@/components/Scoreboard";
import { View, Text, StyleSheet } from "react-native";

export default function Benchmark() {
  const cells = Array.from({ length: 40 }, (_, index) => ({
    id: String(index),
    visible: [2, 5, 18, 31, 36].includes(index),
    value: [2, 5, 18, 31, 36].indexOf(index) + 1 || undefined,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <Board cells={cells} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  boardContainer: {
    flex: 1,
    marginTop: 24,
  },
});
