import React from 'react';
import logo from '../../assets/Cat_codes_official_logo_zoomed_in_version-removebg-preview.png';
import Text3DFlip from "@/components/ui/text-3d-flip"
const Header = () => {
  return (
    <header className="relative z-10 text-white">
        <div className="px-30 py-5 flex gap-3">
          <Text3DFlip
            as="div"
            id="software-name"
            className="font-semibold text-base"
            textClassName="font-semibold text-base"
            flipTextClassName="font-semibold text-base"
            autoFlipInterval={5000}
          >
            CatCodeDidi
          </Text3DFlip>
          <img src={logo} alt="CatCode-Didi" className="h-5 w-5 object-contain" />
        </div>
        <hr className="m-0 w-full border-0 border-t border-gray-600" />
    </header>
  );
};

export default Header;