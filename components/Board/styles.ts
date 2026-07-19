import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },

  cell: {
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 8,

    backgroundColor: "#DDD",
  },

  activeCell: {
    backgroundColor: "#3B82F6",
  },

  text: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
  },
});