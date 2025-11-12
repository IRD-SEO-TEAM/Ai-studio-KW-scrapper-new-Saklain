# Copy Whole Section to CSV - Implementation Summary

## Overview
Added a new feature that allows users to copy the entire AI response section (whole section) to a CSV column. This includes all model output text from the latest response.

## Changes Made

### 1. popup.html
**Changes:** Added a new checkbox for "Copy whole section to CSV"
- Added new checkbox with ID `copyWholeSectionToggle` after the autoCopyResponse checkbox
- Placed in the settings section for easy user access
- Styled consistently with existing checkboxes

### 2. popup.js
**Changes:** Added event listener and storage management for the new toggle
- Added `copyWholeSectionToggle` variable declaration (line after autoCopyResponseCheckbox)
- Updated `chrome.storage.local.get()` to include `'copyWholeSection'` in the keys array
- Added loading of saved setting when popup opens
- Added event listener for the checkbox that:
  - Saves setting to Chrome storage
  - Sends message to content script to update the flag
  - Logs the action for debugging
- Updated `convertToCSV()` function:
  - Added `'Whole_Section'` column to headers for structured data
  - Updated row processing to include `wholeSection` data in the CSV output

### 3. content.js
**Changes:** Added capture and handling of whole section data
- Added `copyWholeSection` variable to track feature status
- Updated state restoration to load `copyWholeSection` setting from storage
- Added restoration code to apply the setting on page load
- Added `setCopyWholeSection` message handler to receive setting changes from popup
- Updated `waitForResponseAndScrape()` function:
  - Captures latest model response container text when `copyWholeSection` is enabled
  - Extracts text from `.model-prompt-container[data-turn-role="Model"]` elements
  - Passes captured text to `saveStructuredCityData()`
- Updated `saveStructuredCityData()` function:
  - Added `wholeSectionData` parameter (default empty string)
  - Stores captured whole section data in each row's `wholeSection` property

### 4. background.js
**Changes:** Added setting propagation to multi-tab mode
- Updated `initiateMultiTabCollection()` to retrieve `copyWholeSection` setting
- Added `copyWholeSection` property to Tab 1 assignment object
- Added `copyWholeSection` property to pending tab assignments
- Updated both `chrome.tabs.sendMessage()` calls for `startCollection` to include the setting
- Ensures the setting is passed from popup to all tabs in multi-tab collection mode

## Data Flow

1. **User toggles checkbox in popup.html**
   - Event listener triggers in popup.js
   - Setting saved to Chrome storage
   - Message sent to content.js

2. **Content script receives setting**
   - `setCopyWholeSection` handler updates the `copyWholeSection` flag
   - Setting persists across page reloads

3. **During data collection**
   - When response is ready, `waitForResponseAndScrape()` checks if `copyWholeSection` is enabled
   - If enabled, extracts full text from latest model response container
   - Text is passed to `saveStructuredCityData()` which stores it with the row data

4. **CSV export**
   - `convertToCSV()` includes `Whole_Section` column in output
   - Each row includes the captured model response text

## CSV Output Format

### For Structured Data (with Whole_Section):
```
Row_Number,Input_Country,English KW,local tone,misspell,city kw,popular url,Whole_Section,Timestamp
1,"USA","keyword","tone","misspell","city","url","[Full AI response text here]","2024-11-12T..."
```

### For Simple Data:
```
Row_Number,City,Response,Timestamp
1,"New York","[response]","2024-11-12T..."
```

## Key Features

- **Optional**: Checkbox can be toggled on/off as needed
- **Multi-tab compatible**: Setting propagates to all tabs in multi-tab collection mode
- **Persistent**: Setting is saved and restored across browser sessions
- **Non-intrusive**: Full text is captured in a separate column, not affecting existing columns
- **Performance**: Only captures text when explicitly enabled, minimal overhead

## Testing Checklist

- [ ] Toggle checkbox in popup - verify saving to storage
- [ ] Reload extension - verify setting is restored
- [ ] Single tab collection with toggle ON - verify whole section captured in CSV
- [ ] Single tab collection with toggle OFF - verify Whole_Section column is empty
- [ ] Multi-tab collection with toggle ON - verify all tabs capture sections
- [ ] Verify CSV column order and headers match specification
- [ ] Test with both structured (table) and simple data formats
