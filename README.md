# StockPulse Insider Activity Prototype

A React Native mobile prototype for exploring fictional insider-trading activity through searchable, filterable trade data and detailed trade views.

## Project Overview

StockPulse is a mobile-first prototype that allows users to:

* View a Market Pulse dashboard with recent activity and summary statistics
* Search and filter fictional insider transactions
* Open individual trades for detailed information and activity visualization
* Understand the context of insider transactions through plain-language explanations

All information shown in the app is fictional demo data stored locally in the project.

## Concept & Data

This is an original mobile concept inspired only by the general product category represented by StockInsider.io.

StockInsider.io was **not** used as a data source, UI source, wording source, or copy source.

Every ticker, company, insider name, transaction, value, date, signal, and chart in this application is fictional local mock data defined in:

```text
src/data/mockTrades.ts
```

## Screens & Features

### Home / Market Pulse

* Market Pulse dashboard
* Fictional demo-data indicator
* Search entry
* Transaction, purchase, sale, and signal summaries
* Top Signals section
* Latest Activity list

### Latest Trades / Screener

* Search by ticker or company
* Transaction type filters
* Insider role filters
* Transaction value filters
* Dynamic result count
* Clear filters action
* Empty-state handling

### Trade Details

* Company and ticker information
* Sector and transaction summary
* Signal-strength indicator
* Complete transaction details
* Seven-day mock activity chart
* Plain-language educational explanation
* Investment disclaimer

## Tech Stack

* **Expo**
* **React Native**
* **TypeScript**
* **React Navigation**
* **@expo/vector-icons**

## Project Structure

```text
src/
├── components/
├── data/
├── hooks/
├── navigation/
├── screens/
├── theme/
├── types/
├── utils/
├── constants/
└── global.css
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Scan the QR code using the Expo Go application on an Android or iOS device.

## Design Decisions

* Dark interface designed for quick scanning of financial-style information
* Reusable components for consistent UI across screens
* Filter chips for fast one-tap filtering
* Purchase/Sale information uses text, icons, and color together rather than color alone
* Shared theme tokens are used for colors, spacing, and border radius
* The activity chart is implemented with React Native views instead of an external chart library

## Known Limitations

This is a prototype using static local data.

There are:

* No live insider filings
* No external API calls
* No backend
* No authentication
* No portfolio tracking
* No alerts or notifications

## AI Use Disclosure

AI assistance was used during development with Claude and ChatGPT to help understand the assignment requirements, troubleshoot Expo and React Native configuration issues, configure navigation, and assist with portions of the project code and documentation.

The application was developed, reviewed and tested by me during development.

## Deliverables

**GitHub Repository:**
https://github.com/ironbat106/insider-activity-mobile-prototype

**Google Drive:**
*     *

