import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useGameStore } from "@/store/gameStore";
import GameHeader from "@/components/organisms/GameHeader";
import GameHUD from "@/components/organisms/GameHUD";
import GameBoard from "@/components/molecules/GameBoard";
import ResultModal from "@/components/organisms/ResultModal";
import ResultCard from "@/components/molecules/ResultCard";
import Button from "@/components/atoms/Button";

export default function GameScreen() {
  const router = useRouter();
  const {
    level,
    attempts,
    score,
    gameState,
    cells,
    expectedValue,
    tappedCellIds,
    wrongCellId,
    totalTime,
    handleCellPress,
    retryRound,
    quitGame,
    saveHighScore,
    initGame,
    resetGame,
  } = useGameStore();

  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveScore = async () => {
    if (!playerName.trim()) {
      setErrorMessage("Por favor, insira seu nome");
      return;
    }

    try {
      setErrorMessage("");
      await saveHighScore(playerName);
      setScoreSaved(true);
    } catch (e: any) {
      setErrorMessage(e.message || "Erro ao salvar score");
    }
  };

  const handlePlayAgain = () => {
    setPlayerName("");
    setScoreSaved(false);
    setErrorMessage("");
    initGame();
  };

  const handleReturnToMenu = () => {
    resetGame();
    router.replace("/");
  };

  if (gameState === "game_over") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#232946" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.gameOverScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.gameOverTitle}>Partida Encerrada</Text>

            <View style={styles.resultCardWrapper}>
              <ResultCard
                score={score}
                level={level - 1}
                totalTime={totalTime}
              />
            </View>

            {/* Score saving block */}
            <View style={styles.saveContainer}>
              {scoreSaved ? (
                <View style={styles.savedMessage}>
                  <Text style={styles.savedText}>
                    ✓ Pontuação salva no Leaderboard!
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.saveLabel}>
                    Gostaria de salvar sua pontuação?
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome..."
                    placeholderTextColor="#475569"
                    value={playerName}
                    onChangeText={setPlayerName}
                    maxLength={15}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  ) : null}
                  <Button
                    title="Salvar Pontuação"
                    onPress={handleSaveScore}
                    variant="primary"
                    style={styles.saveButton}
                  />
                </>
              )}
            </View>

            {/* Navigation buttons */}
            <View style={styles.actionButtons}>
              <Button
                title="Jogar Novamente"
                onPress={handlePlayAgain}
                variant="primary"
                style={styles.actionButton}
              />
              <Button
                title="Menu Inicial"
                onPress={handleReturnToMenu}
                variant="secondary"
                style={styles.actionButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#232946" />
      <View style={styles.gameContent}>
        {/* Game Stats HUD Header */}
        <GameHeader
          level={level}
          attempts={attempts}
          score={score}
          onQuit={quitGame}
        />

        {/* Phase instructions / Memorization Progress Bar */}
        <View style={styles.hudWrapper}>
          <GameHUD
            gameState={gameState}
            expectedValue={expectedValue}
            totalNumbers={Math.min(level + 3, 40)}
          />
        </View>

        {/* Active Board Matrix */}
        <View style={styles.boardWrapper}>
          <GameBoard
            cells={cells}
            gameState={gameState}
            tappedCellIds={tappedCellIds}
            wrongCellId={wrongCellId}
            onCellPress={handleCellPress}
            gap={8}
          />
        </View>

        {/* Incorrect Click Modal Alert */}
        <ResultModal
          visible={gameState === "wrong"}
          attemptsLeft={attempts}
          onContinue={retryRound}
          onQuit={quitGame}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232946",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  keyboardView: {
    flex: 1,
  },
  gameOverScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  gameOverTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 24,
    textAlign: "center",
  },
  resultCardWrapper: {
    width: "100%",
    marginBottom: 24,
  },
  saveContainer: {
    width: "100%",
    backgroundColor: "#121629",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2d3561",
    marginBottom: 24,
    alignItems: "center",
  },
  saveLabel: {
    color: "#cbd5e1", // Slate 300
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#232946",
    borderColor: "#2d3561",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#fffffe",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
    marginTop: 14,
    marginBottom: 8,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  saveButton: {
    width: "100%",
  },
  savedMessage: {
    paddingVertical: 12,
  },
  savedText: {
    color: "#10b981", // Emerald 500
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  actionButtons: {
    width: "100%",
    gap: 12,
  },
  actionButton: {
    width: "100%",
  },
  gameContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  hudWrapper: {
    marginTop: 16,
    marginBottom: 24,
  },
  boardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
