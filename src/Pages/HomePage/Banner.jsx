import React from "react";

const Banner = () => {
  return (
    <div
      className="w-full h-screen bg-[#00000050] flex justify-center items-center"
      style={{
        backgroundImage: `url('/img01-2.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="banner_cnt w-full md:w-[80%]">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl uppercase text-white">
          Business Conference 
        </h1>

        <p className="text-base md:text-lg text-white capitalize mt-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          accusantium tenetur odio excepturi dolorum rerum, repellat nesciunt
          deserunt nostrum fugit.
        </p>

      
      </div>
    </div>
  );
};

export default Banner;
