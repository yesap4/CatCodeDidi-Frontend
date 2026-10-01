import {
  BookOpenCheck,
  BrainCircuit,
  DatabaseBackup,
  FileTerminal,
  MicVocal,
  Sparkles,
} from "lucide-react";

const Capabilites = () => {
  return (
    <section id="features" className="min-h-[120vh] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h3 className="font-[Inter] text-3xl font-bold mb-6 leading-tight text-foreground">
            More than a chatbot.
          </h3>
          <span className="font-[Inter] text-muted-foreground">
            A unified intelligence designed for modern workflows.
          </span>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <div
            id="feature-box"
            className="light-surface-shadow w-full max-w-xl rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-foreground/35"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-foreground">
              <MicVocal size={28} />
            </div>

            <div>
              <h4 className="capabilities-heading-text">
                Voice Conversations
              </h4>
              <p className="capabilities-description-text">
                Talk naturally with CatCodeDidi. The system captures context and
                intent flawlessly.
              </p>
            </div>
          </div>

          <div
            id="feature-box"
            className="light-surface-shadow w-full max-w-xl rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-foreground/35"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-foreground">
              <Sparkles size={28} />
            </div>

            <div>
              <h4 className="capabilities-heading-text">
                Intelligent Answers
              </h4>
              <p className="capabilities-description-text">
                Get clear, structured, and useful responses without unnecessary
                fluff or repetition.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-15 grid gap-8 md:grid-cols-2">
          <div
            id="feature-box"
            className="light-surface-shadow w-full max-w-xl rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-foreground/35"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-foreground">
              <FileTerminal size={28} />
            </div>

            <div>
              <h4 className="capabilities-heading-text">
                Coding Assistant
              </h4>
              <p className="capabilities-description-text">
                Understand complex architecture, create boilerplate, or debug
                tricky algorithms quickly.
              </p>
            </div>
          </div>

          <div
            id="feature-box"
            className="light-surface-shadow w-full max-w-xl rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-foreground/35"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-foreground">
              <BookOpenCheck size={28} />
            </div>

            <div>
              <h4 className="capabilities-heading-text">
                Learning Companion
              </h4>
              <p className="capabilities-description-text">
                Turn complex concepts into simple, digestible explanations
                tailored to your level.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-15 grid gap-8 md:grid-cols-2">
          <div
            id="feature-box"
            className="light-surface-shadow w-full max-w-xl rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-foreground/35"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-foreground">
              <BrainCircuit size={28} />
            </div>

            <div>
              <h4 className="capabilities-heading-text">
                Creative Thinking
              </h4>
              <p className="capabilities-description-text">
                Brainstorm product ideas, marketing copy, or explore entirely
                new possibilities.
              </p>
            </div>
          </div>

          <div
            id="feature-box"
            className="light-surface-shadow w-full max-w-xl rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-foreground/35"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-foreground">
              <DatabaseBackup size={28} />
            </div>

            <div>
              <h4 className="capabilities-heading-text">
                Contextual Memory
              </h4>
              <p className="capabilities-description-text">
                CatCodeDidi remembers your project details, coding style, and
                preferences across sessions for seamless continuity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-12 w-full border-0 border-t border-border" />
    </section>
  );
};

export default Capabilites;
