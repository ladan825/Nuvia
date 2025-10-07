import { ArrowBigUp} from "lucide-react";

const Footer = () => {
    return ( 
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Abbas.co. All rights reserved.
            </p>

             <a href="#root" aria-label="Scroll to Top"> <ArrowBigUp /></a>
        </footer>
     );
}
 
export default Footer;