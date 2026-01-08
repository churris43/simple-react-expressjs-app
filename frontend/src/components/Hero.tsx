import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
}

function Hero({
  title = "Default Title",
  subtitle = "Default Subtitle",
}: HeroProps) {
  return (
    <>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </>
  );
}

export default Hero;
