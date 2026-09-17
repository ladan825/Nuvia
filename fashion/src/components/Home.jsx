import BrandStory from "./BrandStory";
import Hero from "./Hero";
import Gender from "./Gender";
import Campaign from "./Campaign";
import NewInMen from "./NewInMen";
import CartDrawer from "./Cart";


function Home() {
  return (
    <>
      <Hero />
      <Gender />
      <NewInMen />
      <Campaign />
      <BrandStory />
      <CartDrawer />
      
    </>
  );
}

export default Home;