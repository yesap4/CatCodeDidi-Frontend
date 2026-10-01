let recognition;
let listening = false;

const setListeningState = (button, value) => {
  listening = value;
  button.setAttribute("aria-pressed", String(value));
  button.title = value ? "Stop voice input" : "Use microphone";
};

const VoiceInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const InputBox = document.getElementById("input-box");
  const StartStopButton = document.getElementById("mic-button");

  if (!SpeechRecognition || !InputBox || !StartStopButton) {
    console.error("Speech recognition is not available in this browser.");
    return;
  }

  if (!recognition) {
    recognition = new SpeechRecognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      InputBox.value = transcript;
    };

    recognition.onerror = (event) => {
      setListeningState(StartStopButton, false);

      if (event.error === "network") {
        StartStopButton.title =
          "Browser speech service unavailable or blocked";
        console.warn(
          "Speech recognition could not reach the browser speech service. Check browser support, microphone permission, VPN or firewall settings, and try Chrome or Edge.",
        );
        return;
      }

      console.error("Speech recognition error", event.error);
    };

    recognition.onend = () => {
      setListeningState(StartStopButton, false);
    };
  }

  if (listening) {
    recognition.stop();
    return;
  }

  try {
    recognition.start();
    setListeningState(StartStopButton, true);
  } catch (error) {
    setListeningState(StartStopButton, false);
    console.error("Unable to start speech recognition", error);
  }
};

export default VoiceInput