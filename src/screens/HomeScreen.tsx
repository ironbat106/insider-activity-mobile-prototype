import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing, radius } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";
import { formatCurrencyShort, sumPurchaseValue, sumSaleValue, countHighSignals } from "../utils/formatters";
import SummaryCard from "../components/SummaryCard";
import TradeCard from "../components/TradeCard";
 
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
 
const TOP_SIGNALS = ["Large CEO Purchase", "Executive Sale", "Cluster Buy"];
 
export default function HomeScreen({ navigation }: Props) {
  const latestTrades = [...mockTrades]
    .sort((a, b) => new Date(b.filedAt).getTime() - new Date(a.filedAt).getTime())
    .slice(0, 4);
 
  const purchaseTotal = sumPurchaseValue(mockTrades);
  const saleTotal = sumSaleValue(mockTrades);
  const highSignalCount = countHighSignals(mockTrades);
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Market Pulse</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Fictional demo data</Text>
          </View>
        </View>
 
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Screener")}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <Text style={styles.searchText}>Search ticker or company</Text>
        </TouchableOpacity>
 
        <View style={styles.summaryRow}>
          <SummaryCard label="Transactions" value={`${mockTrades.length} demo filings`} />
          <SummaryCard
            label="Purchase value"
            value={`${formatCurrencyShort(purchaseTotal)} demo purchases`}
          />
          <SummaryCard label="Sale value" value={`${formatCurrencyShort(saleTotal)} demo sales`} />
        </View>
 
        <View style={styles.summaryRowSecond}>
          <SummaryCard label="High-strength signals" value={`${highSignalCount} demo signals`} />
        </View>
 
        <Text style={styles.sectionTitle}>Top Signals Today</Text>
        <View style={styles.signalRow}>
          {TOP_SIGNALS.map((signal) => (
            <View key={signal} style={styles.signalChip}>
              <Text style={styles.signalChipText}>{signal}</Text>
            </View>
          ))}
        </View>
 
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Latest Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Screener")}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
 
        {latestTrades.map((trade) => (
          <TradeCard
            key={trade.id}
            trade={trade}
            onPress={() => navigation.navigate("TradeDetails", { tradeId: trade.id })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.chip,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "600",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  searchText: {
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  summaryRowSecond: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signalRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.sm,
  },
  signalChip: {
    backgroundColor: colors.surface,
    borderRadius: radius.chip,
    borderWidth: 1,
    borderColor: colors.accentBlue,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  signalChipText: {
    color: colors.accentBlue,
    fontSize: 12,
    fontWeight: "600",
  },
  viewAll: {
    color: colors.accentBlue,
    fontSize: 13,
    fontWeight: "600",
  },
});
