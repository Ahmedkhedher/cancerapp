# Gemini AI Integration Setup Guide

This guide will help you set up the Gemini AI chat feature in your LifeWeaver app.

## Prerequisites

- A Google Cloud account
- Access to Google AI Studio (https://makersuite.google.com/)

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API Key" or "Create API Key"
4. Copy the generated API key

## Step 2: Configure the API Key

### Option 1: Hardcode (for development only)

Open `src/services/geminiAI.ts` and replace:

```typescript
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
```

with your actual API key:

```typescript
const GEMINI_API_KEY = 'AIzaSy...your-actual-key';
```

⚠️ **Warning**: Never commit your API key to version control!

### Option 2: Use Environment Variables (recommended)

1. Install expo-constants if not already installed:
```bash
npm install expo-constants
```

2. Create a `.env` file in your project root (already in .gitignore):
```
GEMINI_API_KEY=AIzaSy...your-actual-key
```

3. Update `src/services/geminiAI.ts`:
```typescript
import Constants from 'expo-constants';

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || 'YOUR_GEMINI_API_KEY';
```

4. Update `app.json` or `app.config.js` to include:
```json
{
  "expo": {
    "extra": {
      "geminiApiKey": process.env.GEMINI_API_KEY
    }
  }
}
```

## Step 3: Test the Integration

1. Start your development server:
```bash
npm start
```

2. Navigate to the AI Chat screen (💬 icon in the footer)

3. Try sending a test message like: "What are early warning signs of cancer?"

4. The AI should respond with helpful, cancer-awareness focused information

## Features

### Current Implementation

- **Contextual Responses**: The AI is configured to provide compassionate, cancer-awareness focused responses
- **Conversation History**: Messages are stored in the local session
- **Suggested Prompts**: Quick-start prompts for common questions
- **Responsive Design**: Works on mobile and smartwatch screens
- **Loading States**: Visual feedback while waiting for AI responses

### Customization Options

You can customize the AI behavior in `src/services/geminiAI.ts`:

**Temperature** (0.0 - 1.0): Controls creativity
```typescript
temperature: 0.7, // Higher = more creative, Lower = more focused
```

**Max Output Tokens**: Controls response length
```typescript
maxOutputTokens: 1024, // Increase for longer responses
```

**System Context**: Modify the AI's personality and focus
```typescript
const systemContext = `Your custom instructions here...`;
```

## API Limits

Free tier limits:
- 60 requests per minute
- 1,500 requests per day

If you need more, consider upgrading to a paid plan.

## Troubleshooting

### "API request failed: 400"
- Check that your API key is valid
- Ensure you're using the correct API endpoint

### "API request failed: 429"
- You've exceeded the rate limit
- Wait a moment and try again

### No response from AI
- Check your internet connection
- Verify the API key is correctly configured
- Check the browser/app console for error messages

## Security Best Practices

1. ✅ Never commit API keys to version control
2. ✅ Add `.env` to `.gitignore`
3. ✅ Use environment variables for production
4. ✅ Rotate API keys regularly
5. ✅ Set up API restrictions in Google Cloud Console
6. ✅ Monitor API usage

## Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [API Pricing](https://ai.google.dev/pricing)

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your API key is active in Google AI Studio
3. Ensure you haven't exceeded rate limits
4. Review the system context and prompt formatting

---

**Note**: The AI chat is designed to provide general information only and should not replace professional medical advice. Always include appropriate disclaimers in production.
