import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  grid: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#E5E5E5",
    borderRadius: 8,
  },

  activeCell: {
    backgroundColor: "#3B82F6",
  },

  text: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});