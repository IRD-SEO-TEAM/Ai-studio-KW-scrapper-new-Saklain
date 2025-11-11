# Multi-Tab Parallel Processing Implementation

## Overview
This implementation adds the ability to process keywords in parallel across multiple browser tabs, each using a different Google account profile (via `/u/{index}/` URLs).

## Files Modified

### 1. popup.html
**Changes:**
- Added "Number of Tabs" input field (1-10 range)
- Placed between "Start from row" and "Repetition count" sections
- Includes helpful description about parallel processing with different Google profiles

### 2. popup.js
**Changes:**
- Added `numberOfTabsInput` variable to reference the new input field
- Loads saved `numberOfTabs` setting from storage
- Added event listener to save numberOfTabs changes
- **Completely rewrote `startCollection()` function:**
  - Loads CSV and calculates total keywords
  - If `numberOfTabs === 1`: Uses original single-tab flow
  - If `numberOfTabs > 1`: Sends request to background.js to orchestrate multi-tab processing

### 3. background.js
**Changes:**
- Added handler for `initiateMultiTabCollection` message
- **New function `initiateMultiTabCollection()`:**
  - Calculates keyword distribution across tabs
  - Creates multiple tabs with `/u/{profileIndex}/prompts/new_chat` URLs
  - Staggers tab creation (500ms delay between tabs)
  - Sends work assignment to each tab after it loads
  - Each tab gets: `startIndex`, `endIndex`, `profileIndex`, `repetitionCount`, `isMultiTabMode: true`

### 4. content.js
**Changes:**
- Added multi-tab mode variables:
  - `profileIndex`: Which Google account profile to use
  - `isMultiTabMode`: Flag indicating multi-tab operation
  - `assignedStartIndex` & `assignedEndIndex`: Work range for this tab
  
- **Modified message listener:**
  - Detects multi-tab mode from incoming message
  - Calls `startCollection()` with appropriate parameters
  
- **Rewrote `startCollection()` function:**
  - Accepts `startIndex`, `endIndex`, and `config` parameters
  - In multi-tab mode: Slices cityList to assigned range
  - Resets `currentIndex` to 0 for sliced array
  - Logs assigned keyword range
  
- **Modified `startNewChatSession()` function:**
  - In multi-tab mode: Reloads page with `/u/{profileIndex}/prompts/new_chat`
  - In single-tab mode: Uses original "click new chat button" method
  - Saves state before reload
  
- **Updated initialization block:**
  - Restores multi-tab mode variables from storage
  - In multi-tab mode: Resumes with 3-second delay (longer for page reload)
  - In single-tab mode: Uses original 2-second delay
  
- **Updated `saveCollectionState()` function:**
  - Saves multi-tab mode variables to storage
  - Ensures state persists across page reloads

## How It Works

### Single Tab Mode (numberOfTabs = 1)
- Works exactly as before
- All keywords processed sequentially in one tab
- Uses original flow with "new chat" button clicks

### Multi-Tab Mode (numberOfTabs > 1)
1. **Initiation (popup.js):**
   - User clicks Run with numberOfTabs > 1
   - popup.js calculates total keywords
   - Sends request to background.js

2. **Tab Creation (background.js):**
   - Opens multiple tabs with URLs like:
     - Tab 1: `https://aistudio.google.com/u/0/prompts/new_chat`
     - Tab 2: `https://aistudio.google.com/u/1/prompts/new_chat`
     - Tab 3: `https://aistudio.google.com/u/2/prompts/new_chat`
   - Each tab gets a slice of the keyword list

3. **Processing (content.js in each tab):**
   - Each tab processes only its assigned keywords
   - When starting new chat: Reloads with same profile URL
   - State is saved before reload and restored after
   - Each tab works independently and in parallel

4. **Resume After Reload:**
   - Multi-tab mode uses 3-second delay for UI readiness
   - Restores all multi-tab variables from storage
   - Continues from last saved index

## Key Features
- ✅ Parallel processing across multiple Google accounts
- ✅ Automatic keyword distribution
- ✅ Each tab maintains its own profile context
- ✅ State persistence across page reloads
- ✅ Backward compatible (single-tab mode unchanged)
- ✅ Staggered tab creation to avoid browser overload

## Usage
1. Set "Number of Tabs" to desired value (1-10)
2. Ensure you're logged into multiple Google accounts in your browser
3. Click "Run"
4. Extension will open multiple tabs and distribute work automatically
5. Each tab uses a different Google account (u/0, u/1, u/2, etc.)

## Notes
- Each tab processes independently
- Progress is tracked per-tab in storage
- If a tab reloads, it resumes from its last position
- All tabs share the same CSV input file
- Downloaded data from all tabs goes to the same storage
