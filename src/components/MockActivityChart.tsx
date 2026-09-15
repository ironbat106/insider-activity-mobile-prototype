import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../theme/colors";
import { generateWeeklyTrend } from "../utils/formatters";
 
type Props = {
  seed: string;
};
 
const DAY_LABELS = ["D-6", "D-5", "D-4", "D-3", "D-2", "D-1", "Today"];
 
export default function MockActivityChart({ seed }: Props) {
  const points = generateWeeklyTrend(seed);
  const maxPoint = Math.max(...points);
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock 7-day activity</Text>
      <View style={styles.barsRow}>
        {points.map((point, index) => {
          const heightPercent = (point / maxPoint) * 100;
          return (
            <View key={DAY_LABELS[index]} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.bar, { height: `${heightPercent}%` }]} />
              </View>
              <Text style={styles.dayLabel}>{DAY_LABELS[index]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  barsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 90,
  },
  barColumn: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barTrack: {
    width: 12,
    height: "80%",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    backgroundColor: colors.accentPurple,
    borderRadius: 4,
  },
  dayLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    marginTop: 4,
  },
});
