// Test if XLSX library is loaded
console.log('Testing XLSX library...');
console.log('XLSX object:', typeof XLSX);

if (typeof XLSX !== 'undefined') {
    console.log('XLSX library is loaded successfully');
    console.log('XLSX version:', XLSX.version);
} else {
    console.error('XLSX library is not loaded');
}
