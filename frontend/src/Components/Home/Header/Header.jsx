import logo from "../../../assets/Cat_codes_official_logo_zoomed_in_version-removebg-preview.png";
import Text3DFlip from "@/Components/ui/text-3d-flip";
import { ModeToggle } from "@/Components/ui/ModeToggle";
const Header = () => (
  <header className="fixed top-0 left-0 z-20 w-full bg-transparent border-b border-border px-5 py-4 text-foreground">
    <div className="flex items-center gap-3">
      <img src={logo} alt="" className="h-7 w-7 object-contain" />
      <Text3DFlip
        as="div"
        id="software-name"
        className="font-semibold text-foreground"
        textClassName="font-semibold text-foreground"
        flipTextClassName="font-semibold text-foreground"
        autoFlipInterval={5000}
      >
        CatCodeDidi
      </Text3DFlip>
      <div
        id="nav-links"
        className="ml-auto text-sm font-semibold font-[Inter] text-muted-foreground-"
      >
        <nav className="flex items-center gap-4">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <ModeToggle />
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
