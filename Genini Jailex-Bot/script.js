const synth = window.speechSynthesis;

function speakMessage(text, username = null) {
    if (!text || !synth) return;

    try {
        const nameToggle = document.getElementById('nameToggle');
        const volSlider = document.getElementById('volSlider');
        
        let finalSpeech = text;
        if (nameToggle && nameToggle.checked && username) {
            finalSpeech = `${username} says ${text}`;
        }

        const utter = new SpeechSynthesisUtterance(finalSpeech);
        
        // Ensure volume slider is respected, default to max
        utter.volume = volSlider ? parseFloat(volSlider.value) : 1.0;
        utter.rate = 1.0;
        utter.pitch = 1.0;

        // Queue the speech naturally
        synth.speak(utter);
        
    } catch (error) {
        console.log("TTS Error:", error);
    }
}