import Carousel from "../components/ui/carousel.component";
import AboutData from '../aboutdb.json'; 

function About() {
    
    const slides = AboutData.slides
    
    return ( 
    <div className=" snap-child-start w-full h-screen overflow-hidden">
        <Carousel slides={slides} />
    </div> );
}

export default About;