document.getElementById('alert').addEventListener('click', () => {
    const messages = [
        "Believe in yourself!",
        "You can do it!",
        "Keep pushing forward!",
        "Stay positive, work hard, make it happen!",
        "Every day is a new opportunity.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Don't watch the clock; do what it does. Keep going.",
        "Your limitation—it's only your imagination."
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('motivational-message').innerText = randomMessage;
});

function updateDateTime() {
    const now = new Date();
    const optionsDate = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    const formattedDate = now.toLocaleDateString('en-US', optionsDate);
    
    const optionsTime = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    };
    const formattedTime = now.toLocaleTimeString('en-US', optionsTime);
    
    document.getElementById('current-datetime').innerText = `Current Date and Time: ${formattedDate} at ${formattedTime}`;
}

updateDateTime();
setInterval(updateDateTime, 1000); // Update every second