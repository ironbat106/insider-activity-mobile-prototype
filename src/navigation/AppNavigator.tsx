import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
 
const Stack = createNativeStackNavigator<RootStackParamList>();
 
function HomePlaceholder({ navigation }: any) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Home / Market Pulse</Text>
      <Button title="Go to Screener" onPress={() => navigation.navigate("Screener")} />
    </View>
  );
}
 
function ScreenerPlaceholder({ navigation }: any) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Latest Trades / Screener</Text>
      <Button
        title="Open a sample trade"
        onPress={() => navigation.navigate("TradeDetails", { tradeId: "trade-nova-01" })}
      />
    </View>
  );
}
 
function TradeDetailsPlaceholder({ route }: any) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Trade Details</Text>
      <Text>tradeId: {route.params.tradeId}</Text>
    </View>
  );
}
 
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePlaceholder} options={{ title: "Market Pulse" }} />
        <Stack.Screen name="Screener" component={ScreenerPlaceholder} options={{ title: "Screener" }} />
        <Stack.Screen name="TradeDetails" component={TradeDetailsPlaceholder} options={{ title: "Trade Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "600",
  },
});