# LifeWeaver - Cancer Awareness & Support App 🎗️

A modern, responsive React Native application for cancer awareness, support, and community Q&A. Features AI-powered chat assistance, user authentication, and a beautiful UI that adapts to mobile devices and smartwatches.

![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.5-FFCA28?logo=firebase)

## ✨ Features

- 🤖 **AI Chat Assistant** - Powered by Google Gemini AI with markdown formatting
- 📝 **Q&A Community** - Ask and answer cancer-related questions
- 🔐 **Authentication** - Email/password and Google sign-in via Firebase
- 📱 **Responsive Design** - Optimized for mobile phones, tablets, and smartwatches
- 🎨 **Modern UI** - Beautiful, animated components with dark mode support
- 🔔 **Real-time Updates** - Firebase Firestore integration
- 📊 **User Profiles** - Track questions, answers, and activity
- 🌐 **Resources** - Curated links to trusted cancer awareness organizations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **Expo Go** app on your mobile device (optional, for testing)

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

This will start Expo and show you a QR code.

### Run on Device/Emulator

- **📱 Physical Device**: Install [Expo Go](https://expo.dev/client) and scan the QR code
- **🤖 Android Emulator**: Press `a` in the terminal
- **🍎 iOS Simulator** (Mac only): Press `i` in the terminal
- **🌐 Web Browser**: Press `w` in the terminal

## 📁 Project Structure

```
cancerapp/
├── src/
│   ├── context/           # React Context (Auth)
│   ├── data/              # Firebase configuration and store
│   ├── navigation/        # Navigation setup
│   ├── screens/           # App screens
│   │   ├── ChatScreen.tsx       # AI chat interface
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

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - Development framework
- **TypeScript** - Type-safe JavaScript
- **Firebase** - Authentication and database
- **Google Gemini AI** - AI chat assistant
- **React Navigation** - Navigation library
- **react-native-markdown-display** - Markdown rendering

## 🎨 Key Features Explained

### Responsive Design
The app automatically adapts to different screen sizes:
- **Smartwatches** (<250px): Compact UI, essential features only
- **Mobile** (360-768px): Full features, optimized layout
- **Tablets/Desktop** (>768px): Enhanced layouts, additional information

### AI Chat Assistant
- Powered by Gemini 2.0 Flash
- Markdown formatting support (bold, lists, headings)
- Context-aware responses about cancer awareness
- Compassionate, medical-disclaimer-aware AI

### Modern UI Components
- Animated buttons with spring effects
- Elevated cards with shadows
- Loading spinners
- Responsive typography
- Smart footer navigation

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

## 🔐 Security Best Practices

✅ Never commit API keys to version control  
✅ Use environment variables for production  
✅ Update Firestore security rules before going live  
✅ Enable Firebase App Check for production  
✅ Regularly rotate API keys  
✅ Monitor API usage in Google Cloud Console  

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Gemini AI Documentation](https://ai.google.dev/docs)
- [React Navigation](https://reactnavigation.org/)


## 📄 License

This project is for educational and awareness purposes.

## 💡 Support

For questions or issues:
- Check existing documentation
- Review Firebase and Gemini AI setup guides
- Open an issue in the repository

---

**Made with ❤️ for cancer awareness and support**

*Remember: This app provides general information only. Always consult healthcare professionals for medical advice.*
