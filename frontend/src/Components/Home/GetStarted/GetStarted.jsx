import logo from "../../../assets/Cat_codes_official_logo_zoomed_in_version-removebg-preview.png";

const GetStarted = () => {
  return (
    <div className="py-12">
      <div className="max-w-175 mx-auto px-4 sm:px-6 lg:px-8 py-12 border border-brand-border rounded-lg bg-transparent text-center flex justify-center items-center flex-col ">
        <img
          src={logo}
          alt="Cat Codes Logo"
          className="h-12 w-12 m-auto object-contain"
        />
        <h3 className="font-[Inter] text-3xl font-bold mt-5 leading-tight text-foreground">
          Ready To Ask?
        </h3>
        <p className="text-center text-muted-foreground text-sm max-w-md mt-5 ">
          Start your conversation with CatCodeDidi. Elevate your learning,
          coding, and thinking today.
        </p>
        <a href="#home">
          <div
            className="bg-foreground text-background w-40 h-10 mt-5 rounded-[4px] font-[Inter] transition-colors duration-300 hover:bg-brand-gold flex justify-center items-center text-sm font-semibold"
          >
            Start Chatting
          </div>
        </a>
      </div>
    </div>
  );
};

export default GetStarted;
