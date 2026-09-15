import { InsiderTrade } from "../types/trade";
 
export const formatCurrencyShort = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};
 
export const formatFullCurrency = (value: number): string => {
  return `$${value.toLocaleString("en-US")}`;
};
 
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
 
export const formatDateTime = (isoDateTime: string): string => {
  const date = new Date(isoDateTime);
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} • ${timePart}`;
};
 
export const sumPurchaseValue = (trades: InsiderTrade[]): number => {
  return trades
    .filter((trade) => trade.type === "purchase")
    .reduce((total, trade) => total + trade.value, 0);
};
 
export const sumSaleValue = (trades: InsiderTrade[]): number => {
  return trades
    .filter((trade) => trade.type === "sale")
    .reduce((total, trade) => total + trade.value, 0);
};
 
export const countHighSignals = (trades: InsiderTrade[]): number => {
  return trades.filter((trade) => trade.signalStrength === "High").length;
};
 
export const generateWeeklyTrend = (seed: string): number[] => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  const points: number[] = [];
  let current = 40 + (hash % 30);
  for (let i = 0; i < 7; i++) {
    hash = (hash * 17 + 7) % 100;
    current = Math.max(10, Math.min(100, current + (hash % 21) - 10));
    points.push(current);
  }
  return points;
};
