import React from 'react';
import { FondoIbero } from '../assets';

const Hero = () => {
  return (
    <section
      className="h-[170px] bg-cover bg-center max-w-[1280px] items-center mx-auto"
      style={{ backgroundImage: `url(${FondoIbero})` }}
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-30 ">
        <h1 className="text-white text-4xl font-noto font-bold mt-20"></h1>
      </div>
    </section>
  );
};

export default Hero;
