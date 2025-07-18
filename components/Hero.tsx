import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-36 relative">
      {/* Spotlights for background glow */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Grid background */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Radial gradient fade */}
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      {/* Main content */}
      <div className="flex justify-center relative  z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center text-center space-y-6">
          
          {/* Tagline */}
          <p className="uppercase tracking-widest text-xs text-blue-100">
            Code | Creativity | Impact
          </p>

          {/* Your Name + Role */}
          <p className="text-sm md:text-lg lg:text-2xl font-light text-gray-300">
            Hi! I'm <span className="font-semibold text-blue-500">Shreyas</span>, an <span className="font-medium">IT Engineer</span> based in <span className="font-medium">Mumbai, India</span>—crafting modern solutions through <span className="font-medium">Full Stack Development</span> and <span className="font-medium">Data Science</span>.
          </p>

          {/* Animated Headline */}
          <TextGenerateEffect
            words="Building Scalable, Smart & Seamless Digital Experiences"
            className="text-[30px] md:text-5xl lg:text-6xl font-bold"
          />

          {/* Subtext */}
          <p className="text-xs md:text-base lg:text-lg text-gray-500 max-w-xl">
            From responsive web apps to intelligent automation — I love turning ideas into reality with clean code and creative thinking.
          </p>

          {/* Call to Action */}
          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
