import { z } from "zod";

export const LeaderboardEntrySchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(15, "O nome deve ter no máximo 15 caracteres"),
  score: z.number().int().nonnegative(),
  date: z.string(),
});

export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const LeaderboardSchema = z.array(LeaderboardEntrySchema);

export const GameConfigSchema = z.object({
  initialNumbers: z.number().int().min(1).default(4),
  maxAttempts: z.number().int().min(1).default(3),
  memorizationTimeMs: z.number().int().min(500).default(3000),
});

export type GameConfig = z.infer<typeof GameConfigSchema>;
