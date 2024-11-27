import React from 'react';
import { LogoIbero } from '../assets'; // Asegúrate de colocar la ruta correcta

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-md">
    <nav className="flex items-center justify-between h-[80px] max-w-[1280px] mx-auto px-10">
      <div className="flex justify-center">
        <img src={LogoIbero} alt="Logo" className="h-10" />
      </div>
      <div className="text-blue400 text-lg font-noto font-medium">
        <h2>Hallazgos</h2>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
