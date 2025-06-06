"use client";

import TitleHolder from "@/components/holders/TitleHolder";
import CTrendingCourses from "./common/CTrendingCourses";
import CTrendingModules from "./common/CTrendingModules";

const CHome = () => {
  return <>
    {/* Motto */}
    <div className="h-48 md:h-42 w-full bg-dot-black/[0.2] dark:bg-dot-white/[0.2] relative flex items-center justify-center text-2xl/snug xxs:text-3xl/snug lg:text-4xl/snug font-bold text-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
      <div className="hidden xxs:block md:hidden">
        <div>Where Knowledge is </div>
        <div className="text-primary">Crafted for you.</div>
        <div className="text-sm sm:text-base mt-2 mx-2 leading-relaxed text-foreground/50">Personalized Learning, powered by AI Agents.</div>
      </div>

      <div className="block xxs:hidden md:block">
        Where Knowledge is{" "}
        <span className="text-primary">Crafted for You.</span>
        <div className="text-sm md:text-lg mt-2 mx-2 leading-relaxed text-foreground/50">Personalized Learning, powered by AI Agents.</div>
      </div>
    </div>
    {/* Trending courses */}
    <div className="flex flex-col gap-4">
      <TitleHolder
        boldText="Trending"
        lightText="Courses 📚"
        makeBoldTextUppercase
      />
      <CTrendingCourses showSave={false} className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3" setLimit />
    </div>
    {/* Trending modules */}
    <div className="flex flex-col gap-4">
      <TitleHolder
        boldText="Trending"
        lightText="Modules 📈"
        makeBoldTextUppercase
      />
      <CTrendingModules className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3" setLimit />
    </div>
  </>;
}

export default CHome;