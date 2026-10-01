import { Download, Mic, MoveUp } from "lucide-react";
import logo from "../../assets/Cat_codes_official_logo_zoomed_in_version-removebg-preview.png";
import SendPrompt from "@/Components/Features/SendPrompt.js";
import VoiceInput from "@/Components/Features/VoiceInput.js";
import { ModeToggle } from "@/Components/ui/ModeToggle";
import { Link } from "react-router-dom";

const greetings = [
  "You're here!",
  "Welcome!",
  "Good to see you!",
  "Ready when you are!",
];
const greeting = greetings[Math.floor(Math.random() * greetings.length)];

function getAssistantText(data) {
  if (typeof data === "string") return data;
  return (
    data?.answer ||
    data?.response ||
    data?.message ||
    data?.output ||
    data?.content ||
    data?.UserPrompt ||
    JSON.stringify(data)
  );
}

function createAvatar(altText) {
  const avatar = document.createElement("img");
  avatar.src = logo;
  avatar.alt = altText;
  avatar.className = "h-9 w-9 shrink-0 rounded-full border border-border/70 bg-card object-contain p-1";
  return avatar;
}

function addCodeBlock(container, block) {
  const lineBreak = block.indexOf("\n");
  const language = lineBreak === -1 ? "Code" : block.slice(0, lineBreak).trim() || "Code";
  const codeText = lineBreak === -1 ? block.trim() : block.slice(lineBreak + 1).trim();

  const codeBlock = document.createElement("div");
  codeBlock.className = "chat-code-block";

  const header = document.createElement("div");
  header.className = "chat-code-header";

  const languageLabel = document.createElement("span");
  languageLabel.textContent = language;

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.textContent = "Copy";
  copyButton.setAttribute("aria-label", "Copy code");
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(codeText).then(() => {
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1600);
    });
  });

  header.append(languageLabel, copyButton);

  const code = document.createElement("code");
  code.textContent = codeText;

  const pre = document.createElement("pre");
  pre.appendChild(code);

  codeBlock.append(header, pre);
  container.appendChild(codeBlock);
}

function addAssistantContent(container, content) {
  const parts = content.split("```");

  parts.forEach((part, index) => {
    if (index % 2 === 0) {
      if (part.trim()) {
        const paragraph = document.createElement("p");
        paragraph.textContent = part.trim();
        container.appendChild(paragraph);
      }
      return;
    }

    addCodeBlock(container, part);
  });
}

function addUserMessage(messages, prompt) {
  const row = document.createElement("div");
  row.className = "chat-message-enter flex justify-end";

  const bubble = document.createElement("div");
  bubble.className = "chat-user-message max-w-[88%] rounded-2xl rounded-br-md px-5 py-4 text-sm leading-7 sm:max-w-[56%] sm:px-6";
  bubble.textContent = prompt;

  row.appendChild(bubble);
  messages.appendChild(row);
  row.scrollIntoView({ behavior: "smooth", block: "end" });
}

function addThinkingMessage(messages) {
  const row = document.createElement("div");
  row.className = "chat-message-enter flex items-center gap-3 text-sm text-muted-foreground";
  row.appendChild(createAvatar(""));

  const text = document.createElement("span");
  text.textContent = "CatCodeDidi is thinking...";
  row.appendChild(text);

  messages.appendChild(row);
  row.scrollIntoView({ behavior: "smooth", block: "end" });
  return row;
}

function addAssistantMessage(messages, content) {
  const article = document.createElement("article");
  article.className = "chat-message-enter flex max-w-[min(100%,720px)] items-start gap-3 sm:gap-4";
  article.appendChild(createAvatar("CatCodeDidi"));

  const response = document.createElement("div");
  response.className = "min-w-0 flex-1 pt-1";

  const name = document.createElement("div");
  name.className = "mb-3 text-xs font-semibold text-foreground/85";
  name.textContent = "CatCodeDidi";

  const contentBox = document.createElement("div");
  contentBox.className = "chat-assistant-copy space-y-4 text-sm leading-7 text-foreground/85";
  addAssistantContent(contentBox, content);

  response.append(name, contentBox);
  article.appendChild(response);
  messages.appendChild(article);
  article.scrollIntoView({ behavior: "smooth", block: "end" });
}

async function sendMessage(prompt, messages, sendButton) {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt || sendButton.disabled) return;

  messages.querySelector(".chat-welcome")?.remove();
  sendButton.disabled = true;
  addUserMessage(messages, cleanPrompt);

  const thinkingMessage = addThinkingMessage(messages);
  let answer;

  try {
    answer = getAssistantText(await SendPrompt(cleanPrompt));
  } catch {
    answer = `I received “${cleanPrompt}”. The CatCodeDidi service is not reachable right now, so this is a demo reply. Start the assistant service to get a tailored answer.`;
  }

  thinkingMessage.remove();
  addAssistantMessage(messages, answer);
  sendButton.disabled = false;
}

function ChatArea() {
  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const promptBox = form.querySelector("textarea");
    const sendButton = form.querySelector('button[type="submit"]');
    const messages = form.closest(".chat-shell").querySelector("#chat-messages");
    const prompt = promptBox.value.trim();

    if (!prompt || sendButton.disabled) return;
    promptBox.value = "";
    sendMessage(prompt, messages, sendButton);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form.requestSubmit();
    }
  }

  function handleMessagesReady(messages) {
    if (!messages) return;

    const historyState = window.history.state || {};
    const prompt = historyState.usr?.prompt;
    if (!prompt) return;

    const userState = { ...historyState.usr };
    delete userState.prompt;
    window.history.replaceState({ ...historyState, usr: userState }, "");

    const form = messages.closest(".chat-shell").querySelector("#prompt-composer");
    const sendButton = form.querySelector('button[type="submit"]');
    sendMessage(prompt, messages, sendButton);
  }

  return (
    <div className="chat-shell flex h-dvh min-h-[560px] flex-col overflow-hidden text-foreground">
      <header className="chat-header grid h-[72px] shrink-0 grid-cols-3 items-center border-b border-border/70 px-5 sm:px-8">
        <a href="/" className="flex w-fit items-center gap-2.5" aria-label="CatCodeDidi home">
          <img src={logo} alt="" className="h-8 w-8 object-contain" />
          <span className="text-sm font-semibold tracking-[0.01em]">CatCodeDidi</span>
        </a>
        <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
          <Link
            to="/DownloadApp"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-2.5 text-[11px] font-semibold text-foreground shadow-[0_3px_0_hsl(var(--border)),0_6px_12px_rgba(0,0,0,0.14)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_hsl(var(--border)),0_9px_16px_rgba(0,0,0,0.18)] active:translate-y-0.5 active:shadow-[0_1px_0_hsl(var(--border))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:px-4 sm:text-xs"
          >
            <Download size={14} />
            <span>Download app</span>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="chat-scroll-area flex-1 overflow-y-auto px-4 sm:px-8">
        <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col py-10 sm:py-14">
          <div id="chat-messages" ref={handleMessagesReady} className="flex flex-col gap-10 sm:gap-14">
            <div className="chat-welcome mb-8 text-center text-xl font-bold leading-8 text-foreground sm:text-2xl">
              {greeting}
            </div>
          </div>
        </div>
      </main>

      <footer className="chat-composer-wrap shrink-0 px-4 pb-5 pt-3 sm:px-8 sm:pb-7">
        <form id="prompt-composer" onSubmit={handleSubmit} className="chat-composer mx-auto max-w-4xl">
          <textarea
            id="input-box"
            rows={1}
            onKeyDown={handleKeyDown}
            placeholder="Ask Didi anything..."
            aria-label="Ask Didi anything"
            className="chat-textarea block w-full resize-none bg-transparent px-4 pb-14 pt-4 text-sm leading-6 text-foreground placeholder:text-muted-foreground/70"
          />
          <button
            type="button"
            id="mic-button"
            onClick={VoiceInput}
            className="chat-mic-button absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Use microphone"
            title="Use microphone"
          >
            <Mic size={18} />
          </button>
          <span className="chat-composer-hint">Shift + Enter for a new line</span>
          <button
            type="submit"
            className="chat-send-button absolute bottom-3 right-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3.5 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            Send <MoveUp size={16} />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatArea;