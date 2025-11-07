# 📝 Markdown Formatting in AI Chat

The AI chat now supports rich text formatting! Here's what Gemini can use:

## Supported Formatting

### **Bold Text**
```markdown
**This text will be bold**
```
Output: **This text will be bold**

### *Italic Text*
```markdown
*This text will be italic*
```
Output: *This text will be italic*

### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Bullet Lists
```markdown
* First item
* Second item
* Third item
```
Or:
```markdown
- First item
- Second item
- Third item
```

### Numbered Lists
```markdown
1. First step
2. Second step
3. Third step
```

### Combined Formatting
```markdown
**Maintain a Healthy Weight:** Obesity is linked to an increased risk of several types of cancer.

*   **Eat a Healthy Diet:** Focus on a diet rich in fruits, vegetables, and whole grains.
*   **Stay Active:** Regular physical activity is associated with a lower risk of many cancers.
*   **Quit Smoking:** Tobacco use is a leading cause of cancer.

**Disclaimer:** This information is intended for general knowledge only.
```

## Example AI Response

When Gemini sends formatted text like:

```markdown
There are several lifestyle changes you can make:

*   **Maintain a Healthy Weight:** Obesity is linked to increased cancer risk.
*   **Eat a Healthy Diet:** Focus on fruits, vegetables, and whole grains.
*   **Stay Active:** Aim for 150 minutes of exercise per week.

**Disclaimer:** Always consult with healthcare professionals.
```

It will display as:

---

There are several lifestyle changes you can make:

*   **Maintain a Healthy Weight:** Obesity is linked to increased cancer risk.
*   **Eat a Healthy Diet:** Focus on fruits, vegetables, and whole grains.
*   **Stay Active:** Aim for 150 minutes of exercise per week.

**Disclaimer:** Always consult with healthcare professionals.

---

## How It Works

1. **Gemini generates markdown** - The AI naturally uses markdown formatting
2. **Chat displays it beautifully** - `react-native-markdown-display` renders it
3. **User sees formatted text** - Bold, bullets, headings all work!

## Customization

The markdown styles are defined in `ChatScreen.tsx`:

```typescript
markdownBold: {
  fontWeight: '700',
  color: theme.colors.text,
},
markdownListItem: {
  fontSize: scaleFontSize(15),
  lineHeight: scaleFontSize(22),
  color: theme.colors.text,
},
// ... more styles
```

You can customize colors, sizes, and spacing for each element!

## Benefits

✅ **Better readability** - Formatted text is easier to scan
✅ **Professional look** - Clean, polished chat interface
✅ **Structured information** - Lists and headings organize content
✅ **Responsive** - Adapts to mobile and smartwatch screens
✅ **Accessible** - Clear hierarchy improves understanding

---

**Note**: User messages remain plain text. Only AI responses support markdown formatting.
