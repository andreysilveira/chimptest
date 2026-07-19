import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useGameStore } from "@/store/gameStore";
import Button from "@/components/atoms/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();
  const { highScore, score, loadScores, initGame } = useGameStore();

  useEffect(() => {
    loadScores();
  }, []);

  const handleStartGame = () => {
    initGame();
    router.push("/game");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#232946" />
      <View style={styles.content}>
        {/* Logo section */}
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="brain" size={52} color="#3B82F6" />
          </View>
          <Text style={styles.title}>Chimp Test</Text>
          <Text style={styles.subtitle}>Teste sua memória de trabalho</Text>
        </View>

        {/* Score stats */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>MELHOR SCORE</Text>
            <Text style={styles.statValue}>{highScore}</Text>
          </View>
          {score > 0 && (
            <>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>ÚLTIMO SCORE</Text>
                <Text style={styles.statValue}>{score}</Text>
              </View>
            </>
          )}
        </View>

        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Jogar"
            onPress={handleStartGame}
            variant="primary"
            style={styles.menuButton}
          />
          <Button
            title="Leaderboard"
            onPress={() => router.push("/leaderboard")}
            variant="secondary"
            style={styles.menuButton}
          />
        </View>
      </View>

      <Text style={styles.footerText}>
        Inspirado no teste dos chimpanzés do Kyoto University
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232946",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fffffe",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#a9b0d0",
    fontSize: 15,
    marginTop: 6,
    fontWeight: "500",
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#121629",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    color: "#6b7280",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  statValue: {
    color: "#fffffe",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#2d3561",
    marginVertical: 4,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  menuButton: {
    width: "100%",
  },
  footerText: {
    color: "#4a4e6b",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 24,
  },
});
