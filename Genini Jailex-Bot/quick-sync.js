function startJailexSync() {
    const k = document.getElementById('kickInput').value.trim();
    const t = document.getElementById('twitchInput').value.trim();
    
    speakMessage("Systems Online."); // Test sound immediately

    if(k) connectToKick(k);
    if(t) connectToTwitch(t);

    setTimeout(() => { showTab('dash'); }, 2000);
}