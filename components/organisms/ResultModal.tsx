import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../atoms/Button";

interface ResultModalProps {
  visible: boolean;
  attemptsLeft: number;
  onContinue: () => void;
  onQuit: () => void;
}

export default function ResultModal({
  visible,
  attemptsLeft,
  onContinue,
  onQuit,
}: ResultModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={48}
              color="#ef4444"
            />
          </View>

          <Text style={styles.title}>Você errou!</Text>
          <Text style={styles.subtitle}>
            Restam <Text style={styles.attemptsHighlight}>{attemptsLeft}</Text>{" "}
            {attemptsLeft === 1 ? "tentativa" : "tentativas"}.
          </Text>

          <View style={styles.buttonGroup}>
            <Button
              title="Continuar"
              onPress={onContinue}
              variant="primary"
              style={styles.button}
            />
            <Button
              title="Sair da partida"
              onPress={onQuit}
              variant="secondary"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(18, 22, 41, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    backgroundColor: "#232946",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2d3561",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#94a3b8", // Slate 400
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  attemptsHighlight: {
    color: "#ef4444",
    fontWeight: "700",
  },
  buttonGroup: {
    width: "100%",
    gap: 12,
  },
  button: {
    width: "100%",
  },
});
