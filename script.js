
// -------  Compatibility check  ---------
if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    alert('Sorry, your browser does not support the Web Speech API.');
    throw new Error('Web Speech API not supported');
}
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// -------  DOM & state  ---------
const btn = document.getElementById('listen-btn');
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;   // one command at a time

// -------  Speech synthesis helper  ---------
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// -------  Command handler  ---------
function handleCommands(command) {
    if (command.includes('open youtube')) {
        speak('Opening YouTube…');
        window.open('https://www.youtube.com', '_blank');
    } else if (command.includes('open facebook')) {
        speak('Opening Facebook…');
        window.open('https://www.facebook.com', '_blank');
    } else if (command.includes('open instagram')) {
        speak('Opening Instagram…');
        window.open('https://www.instagram.com', '_blank');
    } else {
        speak("I didn't catch that. Please try again.");
    }
}

// -------  Event wiring (only ONCE)  ---------
recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(res => res[0].transcript)
        .join(' ')
        .toLowerCase();
    handleCommands(transcript);
});

recognition.addEventListener('start', () => btn.classList.add('listening'));
recognition.addEventListener('end',  () => btn.classList.remove('listening'));

// -------  Button click  ---------
btn.addEventListener('click', () => {
    speak('Hello, how can I help you?');
    // Wait until greeting finishes, then start listening
    const delay = Math.max(window.speechSynthesis.pending ? 1500 : 0, 800);
    setTimeout(() => recognition.start(), delay);
});
