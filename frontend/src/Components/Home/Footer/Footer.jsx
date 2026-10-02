import logo from "../../../assets/Cat_codes_official_logo_zoomed_in_version-removebg-preview.png";

const Footer = () => {
  return (
    <footer className="relative ml-15">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 z-0 h-40 w-full max-w-4xl -translate-x-1/2 rounded-full bg-radial-[circle,var(--ambient-glow)_0%,var(--glow-transparent)_70%] blur-[100px]"
      />
      <hr className="py-10 w-full border-0 border-t border-border  " />
      <div className="relative z-10 flex gap-14 items-center justify-center mb-6">
        <img
          src={logo}
          alt="Cat Codes Logo"
          className="w-10 h-10 object-contain"
        />
        <div>
          <h5 className="font-semibold font-[Inter] text-[14px]">
            CatCodeDidi
          </h5>
          <p className=" text-muted-foreground text-[12px]">
            Ask. Speak <br /> Learn.
          </p>
        </div>
        <div>
          <nav className="flex gap-4 text-muted-foreground text-[12px]">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </nav>
        </div>
        <div>
            <p className="text-muted-foreground text-[12px]">
                © 2026 CatCodeDidi. All rights <br /> reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
