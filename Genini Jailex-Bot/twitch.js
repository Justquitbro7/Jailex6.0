// Notice the new 'token' parameter
function connectToTwitch(username, token = null) {
    const preview = document.getElementById('chat-preview');
    const channel = username.toLowerCase().trim();
    const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

    ws.onopen = () => {
        ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        
        if (token) {
            // AUTHENTICATED BOT LOGIN (Allows you to send messages later)
            ws.send(`PASS oauth:${token}`);
            ws.send(`NICK ${channel}`);
        } else {
            // READ-ONLY SPECTATOR LOGIN (Fallback)
            ws.send('PASS SCHMOOPIE');
            ws.send('NICK justinfan' + Math.floor(Math.random() * 89999));
        }
        
        ws.send(`JOIN #${channel}`);
    };

    ws.onmessage = (event) => {
        // Handle incoming messages
        if (event.data.includes('PRIVMSG')) {
            const user = event.data.match(/:([^!]+)!/)[1];
            const msg = event.data.match(/PRIVMSG #[^ ]+ :(.+)/)[1];
            preview.innerHTML = `<span style="color:#9146FF">TWITCH | ${user}:</span> ${msg}`;
            
            if (typeof speakMessage === "function") {
                speakMessage(msg, user);
            }
        }
        
        // Twitch requires you to PONG back so they don't disconnect you
        if (event.data.includes('PING')) {
            ws.send('PONG :tmi.twitch.tv');
        }
    };
}