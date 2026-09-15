import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../theme/colors";
import { InsiderTrade } from "../types/trade";
import { formatCurrencyShort, formatDateTime } from "../utils/formatters";
import SignalBadge from "./SignalBadge";
 
type Props = {
  trade: InsiderTrade;
  onPress: () => void;
};
 
export default function TradeCard({ trade, onPress }: Props) {
  const isPurchase = trade.type === "purchase";
  const typeColor = isPurchase ? colors.purchase : colors.sale;
 
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.topRow}>
        <View style={styles.tickerBlock}>
          <Text style={styles.ticker}>{trade.ticker}</Text>
          <Text style={styles.company} numberOfLines={1}>
            {trade.company}
          </Text>
        </View>
        <SignalBadge strength={trade.signalStrength} />
      </View>
 
      <View style={styles.middleRow}>
        <Ionicons
          name={isPurchase ? "arrow-up-circle" : "arrow-down-circle"}
          size={18}
          color={typeColor}
        />
        <Text style={[styles.typeText, { color: typeColor }]}>
          {isPurchase ? "Purchase" : "Sale"}
        </Text>
        <Text style={styles.value}>{formatCurrencyShort(trade.value)}</Text>
      </View>
 
      <View style={styles.bottomRow}>
        <Text style={styles.roleText}>
          {trade.insider} • {trade.role}
        </Text>
        <Text style={styles.filedText}>{formatDateTime(trade.filedAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tickerBlock: {
    flex: 1,
    marginRight: spacing.sm,
  },
  ticker: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  company: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  typeText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
    marginRight: spacing.sm,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  roleText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  filedText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
