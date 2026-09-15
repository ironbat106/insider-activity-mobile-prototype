import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing, radius } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";
import { formatFullCurrency, formatCurrencyShort, formatDate, formatDateTime } from "../utils/formatters";
import MockActivityChart from "../components/MockActivityChart";
 
type Props = NativeStackScreenProps<RootStackParamList, "TradeDetails">;
 
export default function TradeDetailsScreen({ route }: Props) {
  const { tradeId } = route.params;
  const trade = mockTrades.find((item) => item.id === tradeId);
 
  if (!trade) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Trade not found.</Text>
        </View>
      </SafeAreaView>
    );
  }
 
  const isPurchase = trade.type === "purchase";
  const typeColor = isPurchase ? colors.purchase : colors.sale;
 
  const detailRows = [
    { label: "Insider", value: `${trade.insider} • ${trade.role}` },
    {
      label: "Transaction",
      value: `${isPurchase ? "Purchase ↑" : "Sale ↓"} • Code ${trade.transactionCode}`,
    },
    { label: "Shares", value: `${trade.shares.toLocaleString("en-US")} shares` },
    { label: "Price per share", value: `$${trade.pricePerShare.toFixed(2)} (demo)` },
    { label: "Total value", value: `${formatCurrencyShort(trade.value)} (demo)` },
    { label: "Transaction date", value: formatDate(trade.transactionDate) },
    { label: "Filed date", value: formatDateTime(trade.filedAt) },
    { label: "Signal strength", value: `${trade.signalStrength} • ${trade.signal}` },
  ];
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.companyHeader}>
          <View style={styles.companyTitleRow}>
            <Text style={styles.companyName}>{trade.company}</Text>
            <Text style={styles.ticker}>{trade.ticker}</Text>
          </View>
          <Text style={styles.sector}>{trade.sector}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>FICTIONAL DEMO DATA</Text>
          </View>
        </View>
 
        <View style={[styles.signalCard, { borderColor: typeColor }]}>
          <View style={styles.signalHeaderRow}>
            <Ionicons
              name={isPurchase ? "arrow-up-circle" : "arrow-down-circle"}
              size={20}
              color={typeColor}
            />
            <Text style={[styles.signalTitle, { color: typeColor }]}>{trade.signal}</Text>
          </View>
          <Text style={styles.signalSubtitle}>
            {formatFullCurrency(trade.value)} fictional demo{isPurchase ? " insider buy" : " insider sale"}
          </Text>
        </View>
 
        <View style={styles.detailGrid}>
          {detailRows.map((row) => (
            <View key={row.label} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </View>
          ))}
        </View>
 
        <MockActivityChart seed={trade.id} />
 
        <View style={styles.educationCard}>
          <Text style={styles.educationTitle}>Why this matters</Text>
          <Text style={styles.educationText}>
            A senior executive {isPurchase ? "purchase" : "sale"} can be a data point for further research
            because it shows a disclosed transaction by someone close to the company. It does not reveal the
            person's full financial situation or predict future performance.
          </Text>
        </View>
 
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerText}>
            This prototype uses mock data for demonstration only. Insider-trading filings are public
            disclosures and do not constitute investment advice. Past activity does not guarantee future
            stock performance.
          </Text>
        </View>
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
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  companyHeader: {
    marginBottom: spacing.md,
  },
  companyTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    flexShrink: 1,
  },
  ticker: {
    color: colors.accentBlue,
    fontSize: 16,
    fontWeight: "700",
  },
  sector: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.chip,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    marginTop: spacing.xs,
  },
  badgeText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "700",
  },
  signalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  signalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  signalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: spacing.xs,
  },
  signalSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  detailGrid: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  detailValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: spacing.sm,
  },
  educationCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  educationTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  educationText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  disclaimerCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  disclaimerText: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
});
