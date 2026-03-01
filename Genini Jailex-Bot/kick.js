function connectToKick(chatroomId) {
    const preview = document.getElementById('chat-preview');
    const ws = new WebSocket("wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0");

    ws.onopen = () => {
        ws.send(JSON.stringify({
            event: "pusher:subscribe",
            data: { channel: `chatrooms.${chatroomId}.v2` }
        }));
        preview.innerText = "KICK BRIDGE: STABLE";
    };

    ws.onmessage = (event) => {
        const pusherData = JSON.parse(event.data);
        if (pusherData.event === "App\\Events\\ChatMessageEvent") {
            const d = JSON.parse(pusherData.data);
            preview.innerHTML = `<span style="color:#00E701">KICK | ${d.sender.username}:</span> ${d.content}`;
            
            // Trigger TTS
            if (typeof speakMessage === "function") {
                speakMessage(d.content, d.sender.username);
            }
        }
    };
}