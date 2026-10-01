const HowItWorks = () => {
  return (
    <section id="how-it-works">
      <div className="mx-auto max-w-6xl py-12 text-center">
        <h3 className="font-[Inter] text-3xl font-bold mb-6 leading-tight text-foreground">
          Simplicity by design.
        </h3>
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-3 items-start gap-12 px-4 text-center md:gap-16">
        <div id="point-one" className="flex flex-col items-center">
          <div className="light-surface-shadow flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary text-2xl font-semibold text-secondary-foreground">
            01
          </div>
          <h4 className="text-xl font-semibold text-foreground mt-4">Ask</h4>
          <p className="text-center text-muted-foreground text-sm max-w-md">
            Type your complex question or simply use your microphone to speak
            naturally.
          </p>
        </div>
        <div id="point-two" className="flex flex-col items-center">
          <div className="light-surface-shadow flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary text-2xl font-semibold text-secondary-foreground">
            02
          </div>
          <h4 className="text-xl font-semibold text-foreground mt-4">Understand</h4>
          <p className="text-center text-muted-foreground text-sm max-w-md">
            CatCodeDidi instantly processes your request, analyzing context and
            intent.
          </p>
        </div>
        <div id="point-three" className="flex flex-col items-center">
          <div className="light-surface-shadow flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary text-2xl font-semibold text-secondary-foreground">
            03
          </div>
          <h4 className="text-xl font-semibold text-foreground mt-4">Get Help</h4>
          <p className="text-center text-muted-foreground text-sm max-w-md">
            Receive a highly polished, clear, and actionable response instantly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
