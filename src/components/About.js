import Carousel from "../components/ui/carousel.component";
import AboutData from '../aboutdb.json'; 

function About() {

    const slides = AboutData.slides
    
    return ( 
    <div className="snap-child-start top-0 left-0 w-full h-screen overflow-hidden">
        <Carousel slides={slides}/>
    </div> );
}

export default About;