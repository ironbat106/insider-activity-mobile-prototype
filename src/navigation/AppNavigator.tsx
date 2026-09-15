import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { colors } from "../theme/colors";
import HomeScreen from "../screens/HomeScreen";
import ScreenerScreen from "../screens/ScreenerScreen";
import TradeDetailsScreen from "../screens/TradeDetailsScreen";
 
const Stack = createNativeStackNavigator<RootStackParamList>();
 
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Screener" component={ScreenerScreen} options={{ title: "Screener" }} />
        <Stack.Screen
          name="TradeDetails"
          component={TradeDetailsScreen}
          options={({ route }) => ({ title: route.params.tradeId })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}