import React from "react";
import InputBox from "./InputBox";

const HeroSection = () => {
  return (
    <section
      className="relative top-5 flex flex-col justify-center items-center"
      id="home"
    >
      <div
        id="info"
        className="text-[10px] text-center font-semibold text-light font-[Inter] border border-border rounded-full px-3 py-1 mb-6 text-muted-foreground w-fit"
      >
        AI THAT LISTENS, UNDERSTANDS, AND HELPS.
      </div>
      <div className="text-center ">
        <h1 className="font-[Inter] text-5xl font-bold mb-6 leading-tight">
          Ask Anything.
        </h1>
        <span className="italic font-light text-[#d4af37] text-5xl">
          Speak Freely.
        </span>
      </div>
      <div>
        <p className="text-lg text-foreground/60 text-relaxed relative top-5 mb-12 max-w-2xl text-center ">
          Meet CatCodeDidi — your intelligent AI assistant for learning, coding,
          ideas, questions, and everyday conversations.
        </p>
        <InputBox />
      </div>
        <hr className="mt-12 w-full border-0 border-t border-border" />

    </section>
  );
};

export default HeroSection;
