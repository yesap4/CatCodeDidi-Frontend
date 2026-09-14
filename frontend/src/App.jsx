import React from "react";
import { Particles } from "@/Components/ui/particles"
import Header from "./Components/Header/Header";
import AI_Wave from "./Components/Interaction Section/AI Wave/AI_Wave";
import InputBox from "./Components/Interaction Section/InputArea/InputBox";

const App = () => {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <Header />
      <Particles className="absolute inset-0" />
      <div className="flex flex-col justify-center items-center ">
        <AI_Wave />
        <InputBox />
      </div>
    </div>
  );
};

export default App;