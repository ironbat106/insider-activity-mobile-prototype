# StockPulse Insider Activity Prototype
 
## Project overview
A mobile prototype that helps a user scan fictional disclosed-insider activity, search and filter it, and read a plain-language explanation of one selected trade.
 
## Concept and data statement
This is an original mobile concept inspired only by the broad product category represented by StockInsider.io. StockInsider.io was not used as a data source, a copy source, or a UI source. Every ticker, company, insider name, value, date, signal, and chart in this app is fictional local mock/demo data stored in data/mockTrades.ts.
 
## Screens and features
- Home / Market Pulse: search entry, summary totals, Top Signals, Latest Activity list
- Latest Trades / Screener: search plus three independent filters, result count, empty state, clear filters
- Trade Details: company header, signal card, detail grid, seven-day mock chart, education text, required disclaimer
 
## Tech stack
Expo, React Native, TypeScript, React Navigation (native stack), @expo/vector-icons
 
## Setup
1. npm install
2. npx expo start
3. Scan the QR code with the Expo Go app
 
## Mobile design decisions
Dark theme for high scanability, filter chips instead of dropdowns for one-tap filtering, text plus icon plus color together for every Purchase/Sale label so it never relies on color alone.
 
## Known limitations
Static local data only. No live filings, no authentication, no portfolio tracking, no alerts, no backend, no network calls.
 
## AI-use disclosure
(Fill this in honestly with the exact tool or tools you used and what you used them for.)
 
## Deliverables
GitHub repository link and Google Drive folder link (APK, screenshots, and later the demo video) go here.