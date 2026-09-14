import React from "react";
import { ArrowBigRight, Mic } from "lucide-react";
const InputBox = () => {
  return (
    <div className="relative">
      <textarea
        className="h-50 w-100 rounded-2xl border border-orange-400/30 bg-[#171312] p-4 pb-14 font-[Poppins] text-white shadow-[0_0_24px_rgba(255,98,38,0.08)] placeholder:text-white/40"
        placeholder="Ask Me Anything..."
      ></textarea>
      <button
        type="button"
        className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-xl border border-orange-300/20 bg-[#2b1913] text-white/70 transition-colors hover:bg-[#3a2017] hover:text-white"
        aria-label="Use microphone"
      >
        
        <Mic size={20} /> 
      </button>
      <button
        type="button"
        className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl border border-orange-300/20 bg-[#2b1913] text-white/70 transition-colors hover:bg-[#3a2017] hover:text-white"
        aria-label="Send message"
      >
        <ArrowBigRight size={22} />
      </button>
    </div>
  );
};

export default InputBox;
