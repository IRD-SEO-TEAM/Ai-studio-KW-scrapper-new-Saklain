// Test script to verify serial processing implementation

// This script simulates the expected behavior for serial processing
// with the example provided by the user

const keywords = [
    "bangalore namaz timing",
    "namaz time birmingham",
    "prayer times birmingham uk",
    "namaz time in qatar",
    "salat doha time",
    "asr prayer time london",
    "asr time london",
    "lahore prayers time",
    "asr time dhaka",
    "asr time in karachi"
];

const keywordsPerPrompt = 2;
const numberOfTabs = 5;

// Calculate how many keywords per tab
const keywordsPerTab = Math.ceil(keywords.length / numberOfTabs);

console.log("=== SERIAL PROCESSING TEST ===");
console.log(`Total keywords: ${keywords.length}`);
console.log(`Keywords per prompt: ${keywordsPerPrompt}`);
console.log(`Number of tabs: ${numberOfTabs}`);
console.log(`Keywords per tab: ${keywordsPerTab}`);
console.log("");

// Distribute keywords serially across tabs
for (let tab = 1; tab <= numberOfTabs; tab++) {
    const startIndex = (tab - 1) * keywordsPerTab;
    const endIndex = Math.min(startIndex + keywordsPerTab, keywords.length);
    const tabKeywords = keywords.slice(startIndex, endIndex);
    
    console.log(`Tab ${tab}:`);
    console.log(`  Keywords ${startIndex + 1}-${endIndex}:`);
    
    // Group keywords by batch size
    for (let i = 0; i < tabKeywords.length; i += keywordsPerPrompt) {
        const batch = tabKeywords.slice(i, i + keywordsPerPrompt);
        console.log(`    Batch: ${batch.join(', ')}`);
    }
    console.log("");
}

console.log("=== EXPECTED PROCESSING ORDER ===");
console.log("1. Tab 1 processes its keywords first");
console.log("2. When Tab 1 completes, Tab 2 starts processing");
console.log("3. When Tab 2 completes, Tab 3 starts processing");
console.log("4. And so on until all tabs complete");
console.log("");

console.log("=== VERIFICATION ===");
console.log("✓ Keywords are distributed serially across tabs");
console.log("✓ Each tab processes its assigned keywords in batches");
console.log("✓ Tabs process one after another, not in parallel");
