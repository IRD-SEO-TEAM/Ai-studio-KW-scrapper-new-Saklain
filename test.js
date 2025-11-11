// Test script to verify duplicate input detection and auto-download functionality
// This script can be run in the browser console to test the implementation

async function testDuplicateDetection() {
    console.log('Testing duplicate input detection...');
    
    // Simulate loading the CSV with duplicate inputs
    const csvText = `Hindi
Hindi
Hindi
Hindi`;
    
    // Parse the CSV (simulating the parseCSV function)
    const lines = csvText.split('\n');
    const cities = [];
    const inputCounts = {};
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('#')) {
            const city = line.replace(/^["']|["']$/g, '').trim();
            if (city) {
                cities.push(city);
                inputCounts[city] = (inputCounts[city] || 0) + 1;
            }
        }
    }
    
    console.log('Parsed cities:', cities);
    console.log('Input counts:', inputCounts);
    
    // Simulate processing each city
    const processedInputs = {};
    for (const city of cities) {
        processedInputs[city] = (processedInputs[city] || 0) + 1;
        
        console.log(`Processing "${city}" (${processedInputs[city]}/${inputCounts[city]})`);
        
        // Check if all occurrences of this input have been processed
        if (inputCounts[city] > 1 && processedInputs[city] === inputCounts[city]) {
            console.log(`✅ All occurrences of "${city}" processed. Would trigger auto-download with filename "${city}.csv"`);
        }
    }
    
    console.log('Test completed!');
}

// Run the test
testDuplicateDetection();
