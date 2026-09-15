import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { colors, spacing, radius } from "../theme/colors";
import { mockTrades } from "../data/mockTrades";
import { InsiderRole, TransactionType } from "../types/trade";
import FilterChip from "../components/FilterChip";
import TradeCard from "../components/TradeCard";
 
type Props = NativeStackScreenProps<RootStackParamList, "Screener">;
 
type TypeFilter = "all" | TransactionType;
type RoleFilter = "all" | InsiderRole;
type ValueFilter = "any" | 100000 | 500000 | 1000000;
 
export default function ScreenerScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [valueFilter, setValueFilter] = useState<ValueFilter>("any");
 
  const filteredTrades = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
 
    return mockTrades.filter((trade) => {
      const matchesQuery =
        lowerQuery.length === 0 ||
        trade.ticker.toLowerCase().includes(lowerQuery) ||
        trade.company.toLowerCase().includes(lowerQuery);
 
      const matchesType = typeFilter === "all" || trade.type === typeFilter;
      const matchesRole = roleFilter === "all" || trade.role === roleFilter;
      const matchesValue = valueFilter === "any" || trade.value >= valueFilter;
 
      return matchesQuery && matchesType && matchesRole && matchesValue;
    });
  }, [query, typeFilter, roleFilter, valueFilter]);
 
  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setRoleFilter("all");
    setValueFilter("any");
  };
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search ticker or company"
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
 
        <Text style={styles.filterLabel}>Transaction type</Text>
        <View style={styles.chipRow}>
          <FilterChip label="All" selected={typeFilter === "all"} onPress={() => setTypeFilter("all")} />
          <FilterChip
            label="Purchases"
            selected={typeFilter === "purchase"}
            onPress={() => setTypeFilter("purchase")}
          />
          <FilterChip label="Sales" selected={typeFilter === "sale"} onPress={() => setTypeFilter("sale")} />
        </View>
 
        <Text style={styles.filterLabel}>Insider role</Text>
        <View style={styles.chipRow}>
          <FilterChip label="All roles" selected={roleFilter === "all"} onPress={() => setRoleFilter("all")} />
          <FilterChip label="CEO" selected={roleFilter === "CEO"} onPress={() => setRoleFilter("CEO")} />
          <FilterChip label="CFO" selected={roleFilter === "CFO"} onPress={() => setRoleFilter("CFO")} />
          <FilterChip
            label="Director"
            selected={roleFilter === "Director"}
            onPress={() => setRoleFilter("Director")}
          />
        </View>
 
        <Text style={styles.filterLabel}>Value threshold</Text>
        <View style={styles.chipRow}>
          <FilterChip label="Any" selected={valueFilter === "any"} onPress={() => setValueFilter("any")} />
          <FilterChip
            label="$100K+"
            selected={valueFilter === 100000}
            onPress={() => setValueFilter(100000)}
          />
          <FilterChip
            label="$500K+"
            selected={valueFilter === 500000}
            onPress={() => setValueFilter(500000)}
          />
          <FilterChip
            label="$1M+"
            selected={valueFilter === 1000000}
            onPress={() => setValueFilter(1000000)}
          />
        </View>
 
        <View style={styles.resultRow}>
          <Text style={styles.resultCount}>{filteredTrades.length} results</Text>
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearText}>Clear filters</Text>
          </TouchableOpacity>
        </View>
 
        <FlatList
          data={filteredTrades}
          keyExtractor={(trade) => trade.id}
          renderItem={({ item }) => (
            <TradeCard
              trade={item}
              onPress={() => navigation.navigate("TradeDetails", { tradeId: item.id })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No fictional demo trades match those filters.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  filterLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.sm,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  resultCount: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  clearText: {
    color: colors.accentBlue,
    fontSize: 13,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: "center",
  },
});
