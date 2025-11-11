# AI Studio City Data Collector

A Chrome extension that automates data collection from Google AI Studio by processing a list of cities with Google Search grounding enabled.

## Features

- 🏙️ **Automated City Processing**: Reads city names from `input.csv` and processes them one by one
- 🔍 **Google Search Grounding**: Automatically enables Google Search grounding for each query
- 📊 **Data Collection**: Scrapes AI Studio responses and stores them in Chrome local storage
- 📥 **CSV Export**: Download collected data as CSV files
- 🎯 **Real-time Progress**: Track progress with visual indicators
- ⏹️ **Start/Stop Control**: Full control over the collection process

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your Chrome toolbar

## Usage

1. **Prepare Your Data**: 
   - Edit `input.csv` to include your desired city/country names (one per line)
   - The extension comes with a sample list of countries

2. **Navigate to AI Studio**:
   - Go to https://aistudio.google.com/prompts/new_chat
   - Make sure you're logged in

3. **Start Collection**:
   - Click the extension icon in your Chrome toolbar
   - Click "🚀 Start Collection" to begin processing cities
   - The extension will automatically:
     - Enable Google Search grounding
     - Input each city name into the chat box
     - Click the run button
     - Scrape and store the responses

4. **Monitor Progress**:
   - Watch the real-time status updates
   - View progress bar and current city being processed
   - Stop the process anytime with the stop button

5. **Download Results**:
   - Click "📥 Download Results" to export collected data as CSV
   - Data includes city name, AI response, and timestamp

## File Structure

```
├── manifest.json          # Extension manifest
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality
├── content.js             # Content script for AI Studio interaction
├── background.js          # Background service worker
├── input.csv              # Input file with city names
└── README.md              # This file
```

## How It Works

1. **Content Script Injection**: The extension injects a content script into AI Studio pages
2. **CSV Processing**: Reads city names from the `input.csv` file
3. **UI Automation**: 
   - Finds and enables the Google Search grounding toggle
   - Locates the chat input textarea
   - Types city names and clicks the run button
4. **Response Scraping**: Monitors for AI responses and extracts the content
5. **Data Storage**: Saves all responses to Chrome local storage
6. **CSV Export**: Converts stored data to CSV format for download

## Customization

### Adding More Cities
Edit the `input.csv` file to include your desired cities. Each city should be on a new line:

```
New York
London
Paris
Tokyo
Sydney
```

### Modifying Response Scraping
The extension looks for response content in various elements. If AI Studio changes its structure, you may need to update the selectors in `content.js`:

```javascript
const responseElements = document.querySelectorAll('[data-test-id*="response"], .response-content, .ai-response');
```

## Troubleshooting

### Extension Not Working
- Make sure you're on the correct AI Studio page
- Check that the extension is enabled in Chrome
- Refresh the page and try again

### No Responses Being Scraped
- AI Studio may have changed its structure
- Check the browser console for error messages
- The extension will still save "No response received" for failed attempts

### Google Search Grounding Not Enabled
- The extension tries to find and click the grounding toggle
- If it fails, you may need to manually enable it before starting

## Privacy & Security

- All data is stored locally in your Chrome browser
- No data is sent to external servers
- The extension only works on AI Studio pages
- You have full control over your data

## License

This project is open source and available under the MIT License.
