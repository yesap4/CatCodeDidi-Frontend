import { BookOpenCheck, Code2, Lightbulb, MoveUp, Mic } from "lucide-react";
import VoiceInput from "@/Components/Features/VoiceInput.js";

const promptStarters = [
  { label: "Explain a tricky concept", icon: BookOpenCheck },
  { label: "Help me debug code", icon: Code2 },
  { label: "Brainstorm an idea", icon: Lightbulb },
];

const InputBox = () => {
  const fillPromptStarter = (prompt) => {
    const input = document.getElementById("input-box");
    if (!input) return;

    input.value = prompt;
    input.focus();
  };

  const handleSend = () => {
    const inputBox = document.getElementById("input-box")?.value.trim();
    if(!inputBox) {
      return;
    }
    const historyIndex = window.history.state?.idx ?? 0;
    window.history.pushState(
      {
        usr: { prompt: inputBox },
        key: Date.now().toString(36),
        idx: historyIndex + 1,
      },
      "",
      "/ChatArea",
    );
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-4 flex max-w-3xl flex-wrap justify-center gap-2 px-3">
        {promptStarters.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => fillPromptStarter(label)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent-foreground/35 hover:text-foreground"
          >
            <Icon size={15} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <textarea
        id="input-box"
        onKeyDown={handleKeyDown}
        className="light-surface-shadow relative flex w-[min(48rem,calc(100vw-2.5rem))] resize-none items-center gap-2 rounded-lg border border-border bg-card p-2 pb-14 pl-14 pt-3 placeholder:pt-0 placeholder:pl-0 placeholder:text-muted-foreground"
        placeholder="Ask Didi anything..."
      ></textarea>
      <button
        type="button"
        className="absolute cursor-pointer bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:text-yellow-400"
        aria-label="Use microphone"
        id="mic-button"
        onClick={VoiceInput}
      >
        <Mic size={20} className="transition-all hover:h-6 hover:w-6" />
      </button>
      <button
        type="button"
        className="absolute cursor-pointer bottom-4 right-4 gap-2 bg-foreground flex h-9 text-sm font-[Inter] w-24 items-center justify-center rounded-xl border border-border text-background transition-colors duration-300 hover:bg-yellow-400"
        aria-label="Send message"
        id="send-button"
        onClick={handleSend}
      >
        Send
        <MoveUp
          size={22}
          className="h-5 w-5 transition-all duration-300 hover:h-7 hover:w-7"
        />
      </button>
    </div>
  );
};

export default InputBox;
