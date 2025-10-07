import ThemeToggle from "../components/ThemeToggle";
import Meteor from "../components/Meteor";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
    return ( 
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            
            <ThemeToggle />
            <Meteor />
            <main>
                <Hero />
                <About />
                <Skills />
                < Projects />
                <Contact />
                <Footer />
            </main>
            
        </div>
        
     );
}
 
export default Home;