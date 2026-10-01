import { Route, Routes } from "react-router-dom";
import DownloadApp from "@/Components/DownloadApp/DownloadApp.jsx";
import Header from "./Components/Home/Header/Header";
import ChatArea from "@/Components/ChatArea/ChatArea.jsx";
import HeroSection from "./Components/Home/HeroSection/HeroSection";
import AmbientGlow from "./Components/ui/AmbientGlow";
import Capabilites from "./Components/Home/Capabilites/Capabilites";
import HowItWorks from "./Components/Home/HowItWorks/HowItWorks";
import GetStarted from "./Components/Home/GetStarted/GetStarted";
import Footer from "./Components/Home/Footer/Footer";
import { ThemeProvider } from "@/Components/ui/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative flex min-h-screen w-full flex-col">
              <Header />
              <main className="pt-20">
                <div className="flex justify-center items-center">
                  <AmbientGlow />
                  <HeroSection />
                </div>
                <div className="flex flex-col">
                  <Capabilites />
                </div>
                <div>
                  <HowItWorks />
                  <GetStarted />
                </div>
              </main>
              <Footer />
            </div>
          }
        />
        <Route path="/ChatArea" element={<ChatArea />} />
        <Route path="/DownloadApp" element={<DownloadApp />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
