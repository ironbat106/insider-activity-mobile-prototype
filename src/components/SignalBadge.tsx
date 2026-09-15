import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../theme/colors";
import { SignalStrength } from "../types/trade";
 
type Props = {
  strength: SignalStrength;
};
 
const strengthColor = (strength: SignalStrength): string => {
  if (strength === "High") return colors.high;
  if (strength === "Medium") return colors.medium;
  return colors.low;
};
 
export default function SignalBadge({ strength }: Props) {
  const color = strengthColor(strength);
  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{strength}</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.chip,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
