import { Download, Mic, MoveUp } from "lucide-react";
import logo from "../../assets/Cat_codes_official_logo_zoomed_in_version-removebg-preview.png";
import SendPrompt from "@/Components/Features/SendPrompt.js";
import VoiceInput from "@/Components/Features/VoiceInput.js";
import { ModeToggle } from "@/Components/ui/ModeToggle";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { renderToStaticMarkup } from "react-dom/server";

const greetings = [
  "You're here!",
  "Welcome!",
  "Good to see you!",
  "Ready when you are!",
];
const greeting = greetings[Math.floor(Math.random() * greetings.length)];

/* FLOW: user types -> handleSubmit -> sendMessage -> show user message
   -> show "thinking..." -> ask server -> show assistant answer.

   Short syntax replaced with long syntax in this file:
   a?.b -> if check | a || b -> if/else | x ? y : z -> if/else
   () => {} -> function () {} | `Hi ${n}` -> "Hi " + n
   {...obj} -> Object.assign({}, obj) | forEach -> for loop */


// Gets the text out of the server's reply (it can be a string or an object).
function getAssistantText(data) {
  if (typeof data === "string") {
    return data;
  }

  // Try each possible field name until one has a value
  if (data !== null && data !== undefined) {
    if (data.answer) {
      return data.answer;
    }
    if (data.response) {
      return data.response;
    }
    if (data.message) {
      return data.message;
    }
    if (data.output) {
      return data.output;
    }
    if (data.content) {
      return data.content;
    }
    if (data.UserPrompt) {
      return data.UserPrompt;
    }
  }

  // Nothing matched: show the whole object as text
  return JSON.stringify(data);
}


// Builds the small round logo image.
function createAvatar(altText) {
  const avatar = document.createElement("img");
  avatar.src = logo;
  avatar.alt = altText;
  avatar.className = "h-9 w-9 shrink-0 rounded-full border border-border/70 bg-card object-contain p-1";
  return avatar;
}


// Shows code in a box with a language label and a Copy button.
// block looks like "js\nconsole.log(1)": first line = language, rest = code.
function addCodeBlock(container, block) {
  const lineBreak = block.indexOf("\n"); // -1 means no new line found

  // Language name (default: "Code")
  let language;
  if (lineBreak === -1) {
    language = "Code";
  } else {
    language = block.slice(0, lineBreak).trim();
    if (language === "") {
      language = "Code";
    }
  }

  // The code itself
  let codeText;
  if (lineBreak === -1) {
    codeText = block.trim();
  } else {
    codeText = block.slice(lineBreak + 1).trim();
  }

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

  // On click: copy the code, show "Copied" for 1.6 seconds
  copyButton.addEventListener("click", function () {
    navigator.clipboard.writeText(codeText).then(function () {
      copyButton.textContent = "Copied";
      window.setTimeout(function () {
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


// Splits the answer on ``` : even parts (0, 2, 4...) are text,
// odd parts (1, 3, 5...) are code.
function addAssistantContent(container, content) {
  const parts = content.split("```");

  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];

    // Even index = normal text
    if (index % 2 === 0) {
      const trimmedPart = part.trim();

      if (trimmedPart !== "") {
        const markdown = document.createElement("div");
        markdown.className = "chat-markdown";

        // Convert markdown text to an HTML string
        const markdownElement = <ReactMarkdown>{trimmedPart}</ReactMarkdown>;
        const htmlString = renderToStaticMarkup(markdownElement);

        markdown.innerHTML = htmlString;
        container.appendChild(markdown);
      }

      continue; // go to the next part
    }

    // Odd index = code
    addCodeBlock(container, part);
  }
}


// Shows the user's message in a bubble on the right.
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


// Shows a temporary "thinking..." line. Returns it so it can be removed later.
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


// Shows the assistant's answer on the left: avatar + name + content.
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


// Main function: sends the message and shows the reply.
// "async/await" = wait here until the server answers.
async function sendMessage(prompt, messages, sendButton) {
  const cleanPrompt = prompt.trim();

  // Stop if empty, or a request is already running
  if (cleanPrompt === "" || sendButton.disabled === true) {
    return;
  }

  // Remove the welcome text if it exists
  const welcomeMessage = messages.querySelector(".chat-welcome");
  if (welcomeMessage !== null) {
    welcomeMessage.remove();
  }

  sendButton.disabled = true; // prevent double sending
  addUserMessage(messages, cleanPrompt);

  const thinkingMessage = addThinkingMessage(messages);
  let answer;

  // try = attempt the server call; catch = runs if it fails
  try {
    const serverResponse = await SendPrompt(cleanPrompt);
    answer = getAssistantText(serverResponse);
  } catch {
    // Server not reachable: use a demo reply
    answer =
      "I received “" +
      cleanPrompt +
      "”. The CatCodeDidi service is not reachable right now, so this is a demo reply. Start the assistant service to get a tailored answer.";
  }

  thinkingMessage.remove();
  addAssistantMessage(messages, answer);
  sendButton.disabled = false;
}


// React component: handles form submit, Enter key and auto-send on load.
function ChatArea() {

  // Runs when the form is submitted
  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading

    const form = event.currentTarget;
    const promptBox = form.querySelector("textarea");
    const sendButton = form.querySelector('button[type="submit"]');
    const messages = form.closest(".chat-shell").querySelector("#chat-messages");
    const prompt = promptBox.value.trim();

    if (prompt === "" || sendButton.disabled === true) {
      return;
    }

    promptBox.value = ""; // clear the textbox
    sendMessage(prompt, messages, sendButton);
  }

  // Enter sends the message; Shift+Enter makes a new line
  function handleKeyDown(event) {
    if (event.key === "Enter" && event.shiftKey === false) {
      event.preventDefault();
      event.currentTarget.form.requestSubmit();
    }
  }

  // If another page passed a prompt along, send it automatically
  function handleMessagesReady(messages) {
    if (messages === null || messages === undefined) {
      return;
    }

    // Saved navigation data (empty object if none)
    let historyState;
    if (window.history.state) {
      historyState = window.history.state;
    } else {
      historyState = {};
    }

    // Read the prompt only if "usr" exists
    let prompt;
    if (historyState.usr !== null && historyState.usr !== undefined) {
      prompt = historyState.usr.prompt;
    }

    if (prompt === undefined || prompt === null || prompt === "") {
      return;
    }

    // Remove the prompt from history so a page refresh doesn't resend it
    const userState = Object.assign({}, historyState.usr);
    delete userState.prompt;
    const newHistoryState = Object.assign({}, historyState, { usr: userState });
    window.history.replaceState(newHistoryState, "");

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
          <a
            href="https://www.youtube.com/@cc_cat_codes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-2.5 text-[11px] font-semibold text-foreground shadow-[0_3px_0_hsl(var(--border)),0_6px_12px_rgba(0,0,0,0.14)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_hsl(var(--border)),0_9px_16px_rgba(0,0,0,0.18)] active:translate-y-0.5 active:shadow-[0_1px_0_hsl(var(--border))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:px-4 sm:text-xs"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 fill-current"
              aria-hidden="true"
            >
              <title>YouTube</title>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span>Subscribe on Youtube</span>
          </a>
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