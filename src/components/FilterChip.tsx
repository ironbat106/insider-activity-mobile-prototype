import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../theme/colors";
 
type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};
 
export default function FilterChip({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.chip,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  chipSelected: {
    backgroundColor: colors.accentBlue,
    borderColor: colors.accentBlue,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  textSelected: {
    color: colors.background,
  },
});
