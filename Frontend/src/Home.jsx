import React from 'react';
import Image from './RevolveImage';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row bg-black">
      {/* Section with text */}
      <section className="flex justify-center items-center py-10 sm:w-1/2">
        <h1 className="h3-bold text-white md:h2-bold text-center sm:pt-12">Welcome to Quiv.io</h1>
      </section>

      {/* Image container */}
      <div className="flex-1 sm:h-screen sm:overflow-y-auto">
        <Image />
      </div>
    </div>
  );
}

export default Home;
