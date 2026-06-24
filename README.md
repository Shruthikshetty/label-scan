# LabelScan 📸

LabelScan is an AI-first deep food label audit mobile application built with Expo and React Native. Simply snap a picture of any food product packaging, and the app will audit the ingredients, identify red flags, assess macros, and provide a health score out of 10.

## Features

- 📸 **AI Label Scanner:** Scan food packaging labels via camera or gallery upload.
- 🤖 **Deep Ingredient Audit:** Analyzes every single ingredient, classifying them (safe, processed, risky) and highlighting potential hazards.
- 📊 **Dynamic Scoring:** Scores products from 0 to 10 with score-based tier indicators:
  - 🟢 **Safe** (Score ≥ 7.0)
  - 🟡 **Caution** (Score 4.0 - 6.9)
  - 🔴 **Avoid** (Score < 4.0)
- 💾 **Scan History:** Saves all scanned products locally for offline access using SQLite.
- 📈 **Weekly & Monthly Insights:** Interactive charts showing your scanning history trends.

## Demo 

- [Dowload link](https://expo.dev/accounts/shruthikshetty1/projects/label-scan/builds/9fcea273-60c3-4a55-80e7-4f73ac076c03)

## Tech Stack

- **Framework:** Expo (v56) & React Native
- **Navigation:** Expo Router (File-based routing)
- **Styling:** NativeWind (Tailwind CSS v4) & Gluestack UI
- **Database:** Drizzle ORM + Expo SQLite
- **Charts:** Victory Native
- **AI Core:** Vercel AI SDK integration

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add your API key:

```env
EXPO_PUBLIC_AI_GATEWAY_API_KEY=your_api_key_here
```

### 3. Run the App

Start the Expo development server:

```bash
npx expo start
```

Press **a** to run on Android emulator, **i** to run on iOS simulator, or scan the QR code with the Expo Go app.
