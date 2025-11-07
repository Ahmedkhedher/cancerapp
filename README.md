

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Install Dependencies

```bash
cd cancerapp
npm install
```

## 🎯 Running the App

### Start Development Server

```bash
npm start
```

## 📁 Project Structure

```
cancerapp/
├── src/
│   ├── context/           # React Context (Auth)
│   ├── data/              # Firebase configuration and store
│   ├── navigation/        # Navigation setup
│   ├── screens/           # App screens
│   │   ├── ChatScreen.tsx    ## ✨ Features
│   │   │   - 🤖 **AI Chat Assistant** - Powered by Google Gemini AI with markdown formatting
│   │   │   - 📝 **Q&A Community** - Ask and answer cancer-related questions
│   │   │   - 🔐 **Authentication** - Email/password and Google sign-in via Firebase
│   │   │   - 📁 **File Storage** - Upload images and documents to MinIO object storage
│   │   │   - 📱 **Responsive Design** - Optimized for mobile phones, tablets, and smartwatches
│   │   │   - 🎨 **Modern UI** - Beautiful, animated components with dark mode support
│   │   │   - 🔔 **Real-time Updates** - Firebase Firestore integration
│   │   │   - 📊 **User Profiles** - Track questions, answers, and activity
│   │   │   - 🌐 **Resources** - Curated links to trusted cancer awareness organizations
│   │   ├── FeedScreen.tsx       # Q&A feed
│   │   ├── LoginScreen.tsx      # Authentication
│   │   ├── MainScreen.tsx       # Landing page
│   │   ├── ProfileScreen.tsx    # User profile
│   │   └── QuestionScreen.tsx   # Question details
│   ├── services/          # External services (Gemini AI)
│   └── ui/                # UI components, theme, responsive utilities
├── App.tsx                # App entry point
├── package.json           # Dependencies
└── README.md             # This file
```

## 🔧 Troubleshooting

```bash
npm install
# Clear cache if needed
npm start -- --reset-cache
```


### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on web
npm run web

# Format code
npx prettier --write .
```

