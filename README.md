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

## screen shots 
<img width="236" height="518" alt="image" src="https://github.com/user-attachments/assets/9e2673ce-1d4c-4c0a-9b36-51c41bab2d51" />
<img width="232" height="508" alt="image" src="https://github.com/user-attachments/assets/b51957e5-f36c-486d-a3c3-40b69f488d28" />
<img width="236" height="502" alt="image" src="https://github.com/user-attachments/assets/52950ff5-51d6-4cce-815d-f48fe9d6ef3b" />
<img width="236" height="502" alt="image" src="https://github.com/user-attachments/assets/b957065d-f476-4ac7-9865-ea173f64ea73" />
<img width="236" height="502" alt="image" src="https://github.com/user-attachments/assets/9ef2ba11-ba49-4a02-ae1d-961c0ffe29e0" />
<img width="236" height="502" alt="image" src="https://github.com/user-attachments/assets/a6a13ff5-130c-4d61-b735-d35d7b5ac63b" />
