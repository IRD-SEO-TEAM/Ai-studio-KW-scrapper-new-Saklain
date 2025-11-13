# Quick Start - Copy Whole Section Feature

## For Users

### How to Enable
1. Open the AI Studio Kw Scraper popup
2. Check the box next to "Copy whole section to CSV"
3. Run your collection

### What It Does
- Captures the complete AI model response text
- Stores it in a separate `Whole_Section` column in your CSV export
- Applies to all keywords processed while enabled

### When to Use
- When you need the full context of AI responses
- For analysis requiring complete response text
- For auditing AI response quality

---

## For Developers

### How It Works
1. **UI Layer** (popup.html/popup.js)
   - User toggles checkbox
   - Setting saved to Chrome storage
   - Message sent to content script

2. **Collection Layer** (content.js)
   - Flag updated when message received
   - During scraping, if enabled, extracts latest model response
   - Passes text with row data to storage

3. **Export Layer** (popup.js)
   - CSV export includes Whole_Section column
   - Text properly escaped for CSV format

### Code Locations
- **Checkbox UI**: [popup.html](popup.html) (search: `copyWholeSectionToggle`)
- **Event Handler**: [popup.js](popup.js) (search: `setCopyWholeSection`)
- **Text Extraction**: [content.js](content.js) (search: `copyWholeSection`)
- **Multi-tab Support**: [background.js](background.js) (search: `copyWholeSection`)

### Testing
```javascript
// Enable feature programmatically for testing:
chrome.storage.local.set({ copyWholeSection: true });

// Verify capture:
// Check browser console for: "Copy whole section: true"
```

### Debugging
Look for these console messages:
- `Copy whole section setting: [true|false]` - Setting loaded
- `Copy whole section: [true|false]` - Setting changed
- CSV export includes non-empty Whole_Section column when enabled

---

## CSV Column Order (with feature enabled)
```
Row_Number | Input_Country | English KW | local tone | misspell | city kw | popular url | Whole_Section | Timestamp
```

The `Whole_Section` column contains the full AI response text, properly escaped for CSV.
