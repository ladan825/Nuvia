import Hero from "./Hero";
import Gender from "./Gender";
import NewInMen from "./NewInMen";
import Campaign from "./Campaign";
import BrandStory from "./BrandStory";
import Showcase from "./Showcase";

export default function Home() {
  return (
    <>
      <Hero />
      <Gender />
      <NewInMen />
      <Campaign />
      <Showcase /> 
      <BrandStory />
    </>
  );
}