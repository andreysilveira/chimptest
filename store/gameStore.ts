import { create } from "zustand";
import safeStorage from "./storage";
import * as Haptics from "expo-haptics";
import Cell from "@/types/Board/Cell";
import { LeaderboardEntry, LeaderboardEntrySchema, LeaderboardSchema } from "@/types/schemas";

// Constant keys for local persistence
const HIGH_SCORE_KEY = "@chimptest_high_score";
const LEADERBOARD_KEY = "@chimptest_leaderboard";

// Grid configuration
const GRID_ROWS = 8;
const GRID_COLS = 5;
const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

export interface GameStore {
  // Game metrics
  level: number;
  attempts: number;
  score: number;
  highScore: number;
  leaderboard: LeaderboardEntry[];
  totalTime: number; // match duration in seconds

  // Game states
  gameState: "idle" | "memorizing" | "playing" | "wrong" | "game_over";
  cells: Cell[];
  expectedValue: number;
  isStealthMode: boolean; // whether first tap occurred (hides other circles)
  tappedCellIds: string[]; // cell IDs correctly tapped in the current round
  wrongCellId: string | null; // cell ID that was tapped incorrectly


  // Timestamps for calculating elapsed time
  startTime: number | null;
  roundStartTime: number | null;

  // Actions
  initGame: () => void;
  startRound: () => void;
  handleCellPress: (cell: Cell) => void;
  nextLevel: () => void;
  retryRound: () => void;
  quitGame: () => void;
  saveHighScore: (playerName: string) => Promise<void>;
  loadScores: () => Promise<void>;
  startPlaying: () => void;
  resetGame: () => void;
}

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to play Haptics safely
async function triggerHaptic(type: "success" | "error") {
  try {
    if (type === "success") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  } catch (error) {
    // Silently catch if not supported or not running on device
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state values
  level: 1,
  attempts: 3,
  score: 0,
  highScore: 0,
  leaderboard: [],
  totalTime: 0,

  gameState: "idle",
  cells: [],
  expectedValue: 1,
  isStealthMode: false,
  tappedCellIds: [],
  wrongCellId: null,

  startTime: null,
  roundStartTime: null,

  loadScores: async () => {
    try {
      const storedHighScore = await safeStorage.getItem(HIGH_SCORE_KEY);
      const storedLeaderboard = await safeStorage.getItem(LEADERBOARD_KEY);

      const parsedHighScore = storedHighScore ? parseInt(storedHighScore, 10) : 0;
      let parsedLeaderboard: LeaderboardEntry[] = [];

      if (storedLeaderboard) {
        const json = JSON.parse(storedLeaderboard);
        const result = LeaderboardSchema.safeParse(json);
        if (result.success) {
          parsedLeaderboard = result.data;
        }
      }

      set({
        highScore: parsedHighScore,
        leaderboard: parsedLeaderboard,
      });
    } catch (e) {
      console.error("Error loading scores from safeStorage", e);
    }
  },

  initGame: () => {
    set({
      level: 1,
      attempts: 3,
      score: 0,
      totalTime: 0,
      gameState: "memorizing",
      startTime: Date.now(),
      expectedValue: 1,
      isStealthMode: false,
      tappedCellIds: [],
      wrongCellId: null,
    });
    get().startRound();
  },

  startRound: () => {
    const { level } = get();
    // Number of targets for this level: Level 1 = 4, Level 2 = 5, etc.
    const numTargets = Math.min(level + 3, TOTAL_CELLS);

    // Create a pool of cell indices
    const cellIndices = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    const shuffledIndices = shuffleArray(cellIndices);

    // Select the first N indices for the target circles
    const targetIndices = shuffledIndices.slice(0, numTargets);

    // Build the grid cells list
    const newCells: Cell[] = Array.from({ length: TOTAL_CELLS }, (_, index) => {
      const targetPos = targetIndices.indexOf(index);
      if (targetPos !== -1) {
        return {
          id: String(index),
          value: targetPos + 1, // Values 1 to N
          visible: true, // Visible during memorization phase
          disabled: false,
        };
      }
      return {
        id: String(index),
        value: undefined,
        visible: false, // Non-target cells are invisible/disabled
        disabled: true,
      };
    });

    set({
      cells: newCells,
      expectedValue: 1,
      isStealthMode: false,
      tappedCellIds: [],
      wrongCellId: null,
      gameState: "memorizing",
      roundStartTime: Date.now(),
    });
  },

  handleCellPress: (cell: Cell) => {
    const {
      expectedValue,
      cells,
      tappedCellIds,
      gameState,
      level,
      attempts,
      startTime,
    } = get();

    // Ignore taps if not actively playing or memorizing
    if (gameState !== "playing" && gameState !== "memorizing") return;
    if (cell.value === undefined) return;

    // During memorizing phase, only the first number (1) starts the game.
    // Any other tap is ignored entirely.
    if (gameState === "memorizing") {
      if (cell.value !== 1) return;
      set({ gameState: "playing" });
    }

    // Check if it is the correct next number
    if (cell.value === expectedValue) {
      const nextExpected = expectedValue + 1;
      const newTappedIds = [...tappedCellIds, cell.id];
      const isLastCell = cell.value === Math.min(level + 3, TOTAL_CELLS);

      triggerHaptic("success");

      if (isLastCell) {
        // Round Completed Successfully!
        const earnedScore = level + 3;
        const currentHighScore = get().highScore;
        const newHighScore = Math.max(currentHighScore, earnedScore);

        if (newHighScore > currentHighScore) {
          safeStorage.setItem(HIGH_SCORE_KEY, String(newHighScore)).catch(console.error);
        }

        set({
          score: earnedScore,
          highScore: newHighScore,
          tappedCellIds: newTappedIds,
        });

        get().nextLevel();
      } else {
        // Correct press but not the last cell
        set({
          expectedValue: nextExpected,
          tappedCellIds: newTappedIds,
        });
      }
    } else {
      // Incorrect press!
      triggerHaptic("error");
      const nextAttempts = attempts - 1;

      if (nextAttempts > 0) {
        // Still has attempts: Show Retry Modal
        set({
          attempts: nextAttempts,
          gameState: "wrong",
          wrongCellId: cell.id,
        });
      } else {
        // No attempts left: Game Over
        const endTime = Date.now();
        const durationSecs = startTime ? Math.floor((endTime - startTime) / 1000) : 0;

        set({
          attempts: 0,
          gameState: "game_over",
          totalTime: durationSecs,
          wrongCellId: cell.id,
        });
      }
    }
  },

  nextLevel: () => {
    set((state) => ({
      level: state.level + 1,
    }));
    get().startRound();
  },

  retryRound: () => {
    // Keeps level and score, but regenerates positions and starts new memorization
    set({
      gameState: "memorizing",
    });
    get().startRound();
  },

  quitGame: () => {
    const { startTime } = get();
    const endTime = Date.now();
    const durationSecs = startTime ? Math.floor((endTime - startTime) / 1000) : 0;

    set({
      gameState: "game_over",
      totalTime: durationSecs,
    });
  },

  saveHighScore: async (playerName: string) => {
    const { score, leaderboard } = get();

    const newEntry: LeaderboardEntry = {
      name: playerName.trim(),
      score,
      date: new Date().toISOString(),
    };

    // Validate the new entry with Zod
    const validation = LeaderboardEntrySchema.safeParse(newEntry);
    if (!validation.success) {
      throw new Error(validation.error.issues[0]?.message || "Invalid name or score");
    }

    // Insert entry and sort: highest score first; if tie, oldest date first
    const updatedLeaderboard = [...leaderboard, validation.data].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    try {
      await safeStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
      set({
        leaderboard: updatedLeaderboard,
      });
    } catch (e) {
      console.error("Error saving leaderboard", e);
    }
  },

  resetGame: () => {
    set({
      level: 1,
      attempts: 3,
      score: 0,
      totalTime: 0,
      gameState: "idle",
      cells: [],
      expectedValue: 1,
      isStealthMode: false,
      tappedCellIds: [],
      wrongCellId: null,
      startTime: null,
      roundStartTime: null,
    });
  },

  startPlaying: () => {
    set({
      gameState: "playing",
    });
  },
}));
